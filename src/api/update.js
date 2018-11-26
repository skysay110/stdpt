/**
 * 判断应用升级模块，从url地址下载升级描述文件到本地local路径
 *
 * 升级文件为JSON格式数据，如下：
 {
        "appid":"HelloH5",
        "wgtURL": "差量包文件下载地址",
    　　"apkURL"： "apk文件下载地址",
    　　"ipaURL": "appStore中下载的地址",
     　 "version": "新版本号，如：1.0.0",
        "iOS": "ios升级标识 1 不需要升级 2 需要升级从appstore中下载 3 进行差量升级",
        "Android": "android升级标识  1 不需要升级 2 需要升级从服务器下载新的apk 3 进行差量升级"
    }
 *
 */
(function (w) {
  let checkUrl = "http://91jjren.com/update.json"; // 检测更新 地址是自己服务器检测的地址根据自己项目填写
  let downloadWgtUrl = null; // 升级包目录
  let downloadApkUrl = null; // 升级包目录
  let iosURL = null; // 苹果地址
  let oldVer = null; // 当前应用版本号
  let newVer = null; // 新版本号
  let isios = null; // ios是否需要升级 1 需要升级从appstore中下载 2 可以使用
  let isandroid = null; // android是否需要升级 1 需要升级从服务器下载新的apk 2 可以使用
  let wgtWaiting = null;
  let retryCount = 10;

  // plusReady 加载完毕执行
  function plusReady() {
    // 获取本地应用资源版本号
    plus.runtime.getProperty(plus.runtime.appid, function (inf) {
      oldVer = inf.version;
      console.log('当前版本号:' + oldVer);
      checkUpdate();
    });
  }

  // 检测更新
  function checkUpdate() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      switch (xhr.readyState) {
        case 4:
          if (xhr.status === 200) {
            let res = JSON.parse(xhr.responseText);
            console.log('请求回来的版本信息', res);
            // 判断是否需要升级
            newVer = res.version; // 版本号
            isios = res.ios; // ios是否需要升级 1 不升级 2 appStore升级 3 差量升级
            iosURL = res.ipaURL;
            downloadWgtUrl = res.wgtURL;
            downloadApkUrl = res.apkURL;
            isandroid = res.android; // android是否需要升级 1 不升级 2 apk升级 3 差量升级

            // 监听应用启动界面关闭事件
            if (plus.navigator.hasSplashscreen()) { // 启动页未关闭
              document.addEventListener("splashclosed", checkOs, false);
            } else { //启动界面已关闭
              checkOs();
            }
          } else {
            console.log("检测更新失败！");
          }
          break;
        default:
          break;
      }
    };
    xhr.onerror = function (e) {
      let str = "lengthComputable=" + e.lengthComputable + "loaded=" + e.loaded + ";total=" + e.total;
      console.log("onerror: " + str);
      if (retryCount >= 0) {
        setTimeout(() => {
          console.log('再次请求');
          checkUpdate();
          retryCount--;
        }, 1000)
      }
    };
    xhr.open('POST', checkUrl);
    xhr.send();
  }

  /**
   　　* 判断手机系统检测升级
   　　*/
  function checkOs() {
    let isupdate = compareVersion(oldVer, newVer); // 是否差量升级
    console.log('是否更新', isupdate);
    if (!isupdate) {
      return false;
    }

    console.log('当前OS', plus.os.name);
    if (plus.os.name === 'Android') {    // Android 用户
      if (isandroid === 1) {
        return false;
      } else if (isandroid === 2) {
        plus.nativeUI.confirm("检测到有新版本是否更新!", function (e) {
          if (e.index === 1) {
            createDownload();
          }
        }, {
          "title": "提示",
          "buttons": ["取消", "确认"],
        });
      } else {
        downWgt();
      }
    } else { // 苹果用户
      if (isios === 1) {
        return false;
      } else if (isios === 2) {
        plus.nativeUI.confirm("检测到有新版本是否更新!", function (e) {
          if (e.index === 1) {
            plus.runtime.openURL(iosURL);
          }
        }, {
          "title": "提示",
          "buttons": ["取消", "确认"],
        });
      } else {
        downWgt();
      }
    }
  }

  /**
   * 比较版本大小，如果新版本nv大于旧版本ov则返回true，否则返回false
   * @param {String} ov
   * @param {String} nv
   * @return {Boolean}
   */
  function compareVersion(ov, nv) {
    if (!ov || !nv || ov === "" || nv === "") {
      return false;
    }
    let b = false,
      ova = ov.split(".", 4),
      nva = nv.split(".", 4);
    for (let i = 0; i < ova.length && i < nva.length; i++) {
      let so = ova[i], no = parseInt(so), sn = nva[i], nn = parseInt(sn);
      if (nn > no || sn.length > so.length) {
        return true;
      } else if (nn < no) {
        return false;
      }
    }
    if (nva.length > ova.length && 0 === nv.indexOf(ov)) {
      return true;
    }
  }

  // 下载wgt文件
  function downWgt() {
    plus.nativeUI.showWaiting("更新文件...");
    plus.downloader.createDownload(downloadWgtUrl, {filename: "_doc/update/"}, function (d, status) {
      if (status === 200) {
        console.log("下载wgt成功：" + d.filename);
        installWgt(d.filename); // 安装wgt包
      } else {
        console.log("下载wgt失败！");
      }
      plus.nativeUI.closeWaiting();
    }).start();
  }

  // 更新应用资源升级包
  function installWgt(path) {
    plus.nativeUI.showWaiting("安装文件...");
    plus.runtime.install(path, {}, function () {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.alert("应用资源更新完成！", function () {
        plus.runtime.restart();
      });
    }, function (e) {
      plus.nativeUI.closeWaiting();
      plus.nativeUI.alert(JSON.stringify(e));
    });
  }

  /**
   * 创建下载任务 安卓
   */
  function createDownload() {
    wgtWaiting = plus.nativeUI.showWaiting("开始下载");
    let dtask = plus.downloader.createDownload(downloadApkUrl, {filename: '_doc/download/'}, function (d, status) {
      // 下载完成
      if (status === 200) {
        wgtWaiting.setTitle("开始安装");
        plus.runtime.install(d.filename, {}, function () {
          wgtWaiting.close();
        }, function (DOMException) {
          wgtWaiting.close();
          console.log(JSON.stringify(DOMException));
        });
      } else {
        alert("Download failed: " + status);
      }
    });
    dtask.addEventListener("statechanged", function (download, status) {
      switch (download.state) {
        case 2:
          wgtWaiting.setTitle("已连接到服务器");
          break;
        case 3:
          let percent = download.downloadedSize / download.totalSize * 100;
          wgtWaiting.setTitle("已下载 " + parseInt(percent) + "%");
          break;
        case 4:
          wgtWaiting.setTitle("下载完成");
          break;
      }
    });
    dtask.start();
  }

  if (window.plus) {
    plusReady();
  } else {
    document.addEventListener('plusready', plusReady, false);
  }
})(window);
