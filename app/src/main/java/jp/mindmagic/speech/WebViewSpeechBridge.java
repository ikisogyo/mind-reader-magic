package jp.mindmagic.speech;

import android.os.Handler;
import android.os.Looper;
import android.webkit.WebView;
import android.webkit.JavascriptInterface;
import org.json.JSONObject;

/** WebView bridge for SpeechRecognizer. JS interface calls are marshalled to main thread. */
public class WebViewSpeechBridge {
  private final WebView webView;
  private final SpeechRecognitionHelper helper;
  private final Handler mainHandler = new Handler(Looper.getMainLooper());


  public WebViewSpeechBridge(WebView webView, SpeechRecognitionHelper helper) {
    this.webView = webView;
    this.helper = helper;
  }

  // JavascriptInterface methods may run off the UI thread; SpeechRecognizer requires main thread.
  @JavascriptInterface public void start() { mainHandler.post(() -> helper.start()); }
  @JavascriptInterface public void stop() { mainHandler.post(() -> helper.stop()); }
  @JavascriptInterface public void cancel() { mainHandler.post(() -> helper.cancel()); }
  @JavascriptInterface public boolean available() { return helper.isAvailable(); }
  @JavascriptInterface public boolean micPermissionGranted() { return helper.hasMicPermission(); }

  public void emit(String type, String text, int code, boolean listening) {
    try {
      JSONObject detail = new JSONObject();
      detail.put("type", type);
      detail.put("text", text == null ? "" : text);
      detail.put("code", code);
      detail.put("listening", listening);
      String payload = detail.toString();
      webView.post(() -> webView.evaluateJavascript(
        "window.dispatchEvent(new CustomEvent('mindmagic-speech',{detail:" + payload + "}));", null));
    } catch (Exception ignored) { /* Event creation must not interrupt recognition. */ }
  }
}
