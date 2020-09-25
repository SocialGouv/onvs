/*global tarteaucitron*/

// Hotjar
/*
    1. Set the following variable before the initialization :
     tarteaucitron.user.hotjarId = YOUR_WEBSITE_ID;
    tarteaucitron.user.HotjarSv = XXXX; // Can be found in your website tracking code as "hjvs=XXXX"
     2. Push the service :
     (tarteaucitron.job = tarteaucitron.job || []).push('hotjar');
     3. HTML
    You don't need to add any html code, if the service is autorized, the javascript is added. otherwise no.
  */
tarteaucitron.services.hotjar = {
  cookies: [
    "hjClosedSurveyInvites",
    "_hjDonePolls",
    "_hjMinimizedPolls",
    "_hjDoneTestersWidgets",
    "_hjMinimizedTestersWidgets",
    "_hjDoneSurveys",
    "_hjIncludedInSample",
    "_hjShownFeedbackMessage",
  ],
  js: function () {
    "use strict"
    if (
      tarteaucitron.user.hotjarId === undefined ||
      tarteaucitron.user.HotjarSv === undefined
    ) {
      return
    }
    window.hj =
      window.hj ||
      function () {
        ;(window.hj.q = window.hj.q || []).push(arguments)
      }
    window._hjSettings = {
      hjid: tarteaucitron.user.hotjarId,
      hjsv: tarteaucitron.user.HotjarSv,
    }
    var uri = "https://static.hotjar.com/c/hotjar-"
    var extension = ".js?sv="
    tarteaucitron.addScript(
      uri + window._hjSettings.hjid + extension + window._hjSettings.hjsv,
    )
  },
  key: "hotjar",
  name: "Hotjar",
  needConsent: true,
  type: "analytic",
  uri: "https://help.hotjar.com/hc/en-us/categories/115001323967-About-Hotjar",
}
