(function () {
  function findCodeMirrorV5Instances() {
    const editors = [];

    document.querySelectorAll('.CodeMirror').forEach(el => {
      for (const key in el) {
        try {
          const val = el[key];
          if (typeof val?.getValue === 'function') {
            const code = val.getValue();
            editors.push(code);
          }
        } catch {}
      }
    });

    return editors;
  }

  function waitForEditorAndStartPolling() {
    const check = setInterval(() => {
      const editors = findCodeMirrorV5Instances();
      if (editors.length > 0) {
        clearInterval(check);
        startPolling();
      }
    }, 500); // wait for CodeMirror to load
  }

  function startPolling() {
    function poll() {
      const editors = findCodeMirrorV5Instances();
      window.postMessage({ type: 'FROM_PAGE', editors }, '*');
    }

    poll(); // run immediately
    setInterval(poll, 2000); // then poll every 2s
  }

  waitForEditorAndStartPolling();
})();
