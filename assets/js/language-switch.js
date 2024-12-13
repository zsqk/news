document.addEventListener("DOMContentLoaded", function () {
  const zhDetails = document.querySelector('details[lang="zh"]');
  const enDetails = document.querySelector('details[lang="en"]');

  if (!zhDetails && !enDetails) {
    return;
  }

  if (!zhDetails) {
    enDetails.setAttribute("open", "");
    return;
  }

  if (!enDetails) {
    zhDetails.setAttribute("open", "");
    return;
  }

  const browserLang = navigator.language.toLowerCase().slice(0, 2);
  if (browserLang === "zh") {
    zhDetails.setAttribute("open", "");
    enDetails.removeAttribute("open");
  } else {
    zhDetails.removeAttribute("open");
    enDetails.setAttribute("open", "");
  }
});
