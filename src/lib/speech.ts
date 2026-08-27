import { toast } from "sonner";

function fail(message: string) {
  toast.error(message);
}

export function speakChinese(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) {
    fail("这台设备不支持朗读");
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.92;
    const voices = window.speechSynthesis.getVoices();
    const zh = voices.find((v) => v.lang.startsWith("zh"));
    if (zh) u.voice = zh;
    u.onerror = () => fail("朗读没能开始，请检查系统声音设置");
    window.speechSynthesis.speak(u);
  } catch {
    fail("朗读没能开始");
  }
}

export function speakEnglish(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) {
    fail("这台设备不支持朗读");
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "en-US";
    u.rate = 0.95;
    u.onerror = () => fail("朗读没能开始，请检查系统声音设置");
    window.speechSynthesis.speak(u);
  } catch {
    fail("朗读没能开始");
  }
}
