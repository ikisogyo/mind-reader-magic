package jp.mindmagic.app;

import android.Manifest;
import android.app.Activity;
import android.os.Bundle;
import android.content.pm.PackageManager;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.JavascriptInterface;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import jp.mindmagic.speech.SpeechRecognitionHelper;
import jp.mindmagic.speech.WebViewSpeechBridge;

public class MainActivity extends Activity {
  private static final int MIC_REQUEST = 1480;
  private WebView webView;
  private SpeechRecognitionHelper speech;
  private WebViewSpeechBridge bridge;
  private boolean pendingStart = false;

  @Override public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    webView = new WebView(this);
    webView.getSettings().setJavaScriptEnabled(true);
    webView.getSettings().setDomStorageEnabled(true);
    webView.setWebViewClient(new WebViewClient());
    setContentView(webView);
    speech = new SpeechRecognitionHelper(this, new SpeechRecognitionHelper.Callback() {
      @Override public void onPartial(String text) { emit("partial", text, 0, true); }
      @Override public void onResult(String text) { emit("result", text, 0, false); }
      @Override public void onError(String message, int code) { emit("error", message, code, false); }
      @Override public void onListeningChanged(boolean listening) { emit("state", "", 0, listening); }
    });
    bridge = new WebViewSpeechBridge(webView, speech) {
      @JavascriptInterface @Override public void start() { runOnUiThread(() -> requestMicAndStart()); }
    };
    webView.addJavascriptInterface(bridge, "MindMagicSpeech");
    webView.loadUrl("file:///android_asset/index.html");
  }

  private void emit(String type, String text, int code, boolean listening) {
    if (bridge != null) bridge.emit(type, text, code, listening);
  }
  private void requestMicAndStart() {
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.RECORD_AUDIO) == PackageManager.PERMISSION_GRANTED) { speech.start(); return; }
    pendingStart = true;
    ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.RECORD_AUDIO}, MIC_REQUEST);
  }
  @Override public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] results) {
    super.onRequestPermissionsResult(requestCode, permissions, results);
    if (requestCode == MIC_REQUEST) {
      boolean granted = results != null && results.length > 0 && results[0] == PackageManager.PERMISSION_GRANTED;
      if (pendingStart && granted) speech.start();
      else emit("error", "マイクの許可が必要です", -1001, false);
      pendingStart = false;
    }
  }
  // Stop microphone recognition when the activity leaves the foreground. This avoids
  // unexpectedly continuing to listen while the user switches apps or locks the screen.
  @Override public void onStop() {
    // Permission dialogs and app switching can leave a pending start request queued.
    // Clear it before cancelling so returning from background never starts the mic unexpectedly.
    pendingStart = false;
    if (speech != null) speech.cancel();
    super.onStop();
  }

  // Android system back returns from settings to the performance screen; on the performance screen it exits.
  @Override public void onBackPressed() {
    if (webView == null) { finish(); return; }
    webView.evaluateJavascript("(typeof handleAndroidBack === "function" && handleAndroidBack())", value -> {
      if (!"true".equals(value)) finish();
    });
  }

  @Override public void onDestroy() { if (speech != null) speech.destroy(); if (webView != null) webView.destroy(); super.onDestroy(); }
}
