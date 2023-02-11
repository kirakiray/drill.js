if (typeof drill !== "undefined") {
  // In the browser, load the work plugin
  drill.ext(({ bag, addLoader, addProcess }) => {
    addLoader("work", async ({ src, record }) => {
      record.done((pkg) => {
        return new Promise((resolve, reject) => {
          let worker = new Worker(src);

          worker.postMessage(pkg.data);

          worker.onmessage = (e) => {
            if (e.data) {
              let { data, status } = e.data;

              if (status == "done") {
                resolve(data);
                worker.terminate();
              }
            }
          };
        });
      });
    });
  });
} else {
  // Within the worker environment, add a shortcut to use the method
  let data;
  let getted_msg = false;

  // Event Temporary Storage Queue
  const e_arr = [];

  const run_work = async (func) => {
    let reval = await func({
      data,
    });

    postMessage({
      status: "done",
      data: reval,
    });

    // close();
  };

  onmessage = (e) => {
    data = e.data;

    if (e_arr.length) {
      e_arr.forEach(run_work);
      e_arr.length = 0;
    }
  };

  let runned_work = false;

  globalThis.work = async (callback) => {
    if (runned_work) {
      setTimeout(() => {
        close();
      }, 1000);
      throw {
        desc: "In the Worker, the work module can only be run once",
      };
    }

    // Run once
    runned_work = true;
    if (getted_msg) {
      run_work(callback);
    } else {
      e_arr.push(callback);
    }
  };
}
