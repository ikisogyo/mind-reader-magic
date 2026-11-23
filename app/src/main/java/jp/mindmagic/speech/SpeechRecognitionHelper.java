package jp.mindmagic.speech;

import android.Manifest;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.speech.RecognitionListener;
import android.speech.RecognizerIntent;
import android.speech.SpeechRecognizer;
import androidx.core.content.ContextCompat;
import java.util.ArrayList;
import java.util.Locale;

/** Short Japanese cue-word recognition helper. Call methods on the main thread. */
public final class SpeechRecognitionHelper {
  public interface Callback {
    void onPartial(String text);
    void onResult(String text);
    void onError(String message, int code);
    void onListeningChanged(boolean listening);
  }

  private final Context context;
  private final Callback callback;
  private SpeechRecognizer recognizer;
  private boolean listening = false;
  // Tracks the recognizer lifecycle separately from the UI listening flag.
  // stopListening() may leave recognition active until onResults/onError arrives.
  private boolean recognitionActive = false;
  private boolean destroyed = false;


  public SpeechRecognitionHelper(Context context, Callback callback) {
    this.context = context.getApplicationContext();
    this.callback = callback;
  }


  public boolean isAvailable() {
    return SpeechRecognizer.isRecognitionAvailable(context);
  }

  public boolean hasMicPermission() {
    return ContextCompat.checkSelfPermission(context, Manifest.permission.RECORD_AUDIO)
      == PackageManager.PERMISSION_GRANTED;
  }

  public void start() {
    if (destroyed || recognitionActive) return;
    if (!hasMicPermission()) {
      callback.onError("マイクの使用許可が必要です", -1001);
      return;
    }
    if (!isAvailable()) {
      callback.onError("この端末では音声認識サービスが利用できません", -1002);
      return;
    }
    if (recognizer == null) {
      try {
        recognizer = SpeechRecognizer.createSpeechRecognizer(context);
        if (recognizer == null) {
          callback.onError("音声認識サービスを初期化できませんでした", -1004);
          return;
        }
        recognizer.setRecognitionListener(listener);
      } catch (RuntimeException ex) {
        // Service creation/listener setup can fail on some devices. Keep the app usable.
        if (recognizer != null) {
          try { recognizer.destroy(); } catch (RuntimeException ignored) { }
          recognizer = null;
        }
        callback.onError("音声認識サービスを初期化できませんでした: " + ex.getMessage(), -1004);
        return;
      }
    }
    Intent intent = new Intent(RecognizerIntent.ACTION_RECOGNIZE_SPEECH);
    intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE, Locale.JAPAN.toLanguageTag());
    intent.putExtra(RecognizerIntent.EXTRA_LANGUAGE_MODEL, RecognizerIntent.LANGUAGE_MODEL_FREE_FORM);
    intent.putExtra(RecognizerIntent.EXTRA_PARTIAL_RESULTS, true);
    intent.putExtra(RecognizerIntent.EXTRA_MAX_RESULTS, 5);
    intent.putExtra(RecognizerIntent.EXTRA_CALLING_PACKAGE, context.getPackageName());
    recognitionActive = true;
    listening = true;
    callback.onListeningChanged(true);
    try {
      recognizer.startListening(intent);
    } catch (RuntimeException ex) {
      recognitionActive = false;
      listening = false;
      callback.onListeningChanged(false);
      callback.onError("音声認識を開始できませんでした: " + ex.getMessage(), -1003);
    }
  }

  public void stop() {
    // Release the recognition guard immediately; cancel may throw on some OEM services.
    recognitionActive = false;
    if (recognizer != null) {
      try { recognizer.cancel(); }
      catch (RuntimeException ex) {
        try { recognizer.destroy(); } catch (RuntimeException ignored) { }
        recognizer = null;
      }
    }
    setListening(false);
  }

  public void cancel() {
    recognitionActive = false;
    if (recognizer != null) {
      try { recognizer.cancel(); }
      catch (RuntimeException ex) {
        try { recognizer.destroy(); } catch (RuntimeException ignored) { }
        recognizer = null;
      }
    }
    setListening(false);
  }

  public void destroy() {
    destroyed = true;
    recognitionActive = false;
    if (recognizer != null) {
      try { recognizer.cancel(); } catch (RuntimeException ignored) { }
      try { recognizer.destroy(); } catch (RuntimeException ignored) { }
      recognizer = null;
    }
    setListening(false);
  }
  private void setListening(boolean value) {
    if (listening != value) {
      listening = value;
      callback.onListeningChanged(value);
    }
  }

  private final RecognitionListener listener = new RecognitionListener() {
    @Override public void onReadyForSpeech(Bundle params) { setListening(true); }
    @Override public void onBeginningOfSpeech() { }
    @Override public void onRmsChanged(float rmsdB) { }
    @Override public void onBufferReceived(byte[] buffer) { }
    @Override public void onEndOfSpeech() { }
    @Override public void onError(int error) {
      recognitionActive = false;
      setListening(false);
      callback.onError(errorText(error), error);
    }
    @Override public void onResults(Bundle results) {
      recognitionActive = false;
      setListening(false);
      ArrayList<String> list = results == null ? null : results.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
      if (list != null && !list.isEmpty()) callback.onResult(list.get(0));
      else callback.onError("音声を認識できませんでした", SpeechRecognizer.ERROR_NO_MATCH);
    }
    @Override public void onPartialResults(Bundle partialResults) {
      ArrayList<String> list = partialResults == null ? null : partialResults.getStringArrayList(SpeechRecognizer.RESULTS_RECOGNITION);
      if (list != null && !list.isEmpty()) callback.onPartial(list.get(0));
    }
    @Override public void onEvent(int eventType, Bundle params) { }
  };

  private static String errorText(int code) {
    switch (code) {
      case SpeechRecognizer.ERROR_AUDIO: return "音声入力に問題が発生しました";
      case SpeechRecognizer.ERROR_CLIENT: return "音声認識の呼び出しに問題があります";
      case SpeechRecognizer.ERROR_INSUFFICIENT_PERMISSIONS: return "マイクの使用許可がありません";
      case SpeechRecognizer.ERROR_NETWORK: return "ネットワークエラーです";
      case SpeechRecognizer.ERROR_NETWORK_TIMEOUT: return "通信がタイムアウトしました";
      case SpeechRecognizer.ERROR_NO_MATCH: return "合図を認識できませんでした。もう一度お話しください";
      case SpeechRecognizer.ERROR_RECOGNIZER_BUSY: return "音声認識が使用中です";
      case SpeechRecognizer.ERROR_SERVER: return "音声認識サービス側のエラーです";
      case SpeechRecognizer.ERROR_SPEECH_TIMEOUT: return "音声が聞き取れませんでした";
      default: return "音声認識エラー (" + code + ")";
    }
  }
}
