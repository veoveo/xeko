function fetchData(ss_id) {
  if (document.getElementById(ss_id) != null) {
      let coin_id = 0
      var xhr = new XMLHttpRequest();
      var url = `https://live.shopee.vn/api/v1/session/${ss_id}/coin/user_config?uid=523499622`;
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          var response = JSON.parse(xhr.responseText);
          if (response.data && response.data.remain_locks !== 0) {
            console.log("Số xu đang nhận:", response.data.coins_per_claim);
            coin_id = response.data.coin_id
            lock_coin(response.data.coin_id, ss_id, response.data.coins_per_claim);
          } else {
            // Nếu coin_id vẫn là 0, tiếp tục gửi yêu cầu lại
            fetchData(ss_id);
          }
        }
      };
    
      xhr.open("GET", url, true);
      xhr.send();
  }
}

function lock_coin(coin_id, ss_id, coin) {
    var xhr = new XMLHttpRequest();
    var url = `https://live.shopee.vn/api/v1/session/${ss_id}/coin/lock`;
    var data = JSON.stringify({"uid": 1756170, "coin_id": coin_id});
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
          var responseData = JSON.parse(xhr.responseText);
    
          if (responseData.err_code == 0) {
	    document.getElementById(ss_id).getElementsByClassName("m-LiveList-CardTips-card-tag m-LiveList-CardTips-card-live-icon")[0].textContent = coin;
            coud(responseData.data.require_wait_time, ss_id)
            setTimeout(function() {
              can_claim(coin_id, ss_id);
            }, responseData.data.require_wait_time*1000); // chờ n giây

          } else {
            // Nếu err_code khác 0
            console.log("lỗi lock xu: ", responseData.err_msg)
            fetchData(ss_id)
          }
        } else {
          console.log("(lock_coin)Yêu cầu POST không thành công. Mã trạng thái:", xhr.status);
        }
      }
    };
    xhr.send(data);
}

function can_claim(coin_id, ss_id) {
    var xhr = new XMLHttpRequest();
    var url = `https://live.shopee.vn/api/v1/session/${ss_id}/coin/can_claim`;
    var data = JSON.stringify({"uid": 1756170, "coin_id": coin_id});
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
          var responseData = JSON.parse(xhr.responseText);
    
          console.log("Yêu cầu POST thành công!");
          claim(coin_id, ss_id)
        } else {
          console.log("(can_claim) Yêu cầu POST không thành công. Mã trạng thái:", xhr.status);
        }
      }
    };
    xhr.send(data);
};

function claim(coin_id, ss_id) {
    var xhr = new XMLHttpRequest();
    var url = `https://live.shopee.vn/api/v1/session/${ss_id}/coin/claim`;
    var data = JSON.stringify({"uid": 1756170, "coin_id": coin_id});
    
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          // Chuyển đổi dữ liệu JSON thành đối tượng JavaScript
          var responseData = JSON.parse(xhr.responseText);
    
          console.log("Nhận thành công! ", coin_id);
          fetchData(ss_id)
        } else {
          console.log("(claim) Yêu cầu POST không thành công. Mã trạng thái:", xhr.status);
        }
      }
    };
    xhr.send(data);
};

function coud(seconds, ss_id) {
    var countdownInterval = setInterval(function () {      var minutes = Math.floor(seconds / 60);
      var remainingSeconds = seconds % 60;
      var display = minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds;
      document.getElementById(ss_id).getElementsByClassName("m-LiveList-CardTips-card-viewers-count")[0].textContent = display;
      seconds--;
      if (seconds < 0) {
        clearInterval(countdownInterval);
      }}, 1000);
}
function add_element(ssid) {
    for (var element of document.getElementsByClassName("column")) {
            if (element.id == "none") {
                element.innerHTML = `<div class="card-current section-card"><div class="shopee-img card-cover" style="height: 100%; width: 100%; background-size: 100%;"><img class="visible cover" src="https://cf.shopee.vn/file/2cf03c8d5b9fb130285a8d955a326319" alt="https://cf.shopee.vn/file/vn-11134104-7r98o-lndp9hihlqlpee" width="428" height="428"></div><div class="m-LiveList-CardTips"><span class="m-LiveList-CardTips-card-tag m-LiveList-CardTips-card-live-icon"><div class="m-LiveList-CoinsIcon-card-coins-icon"><svg width="12" height="12"><defs><linearGradient x1="20.55%" y1="11.176%" x2="77.657%" y2="88.181%" id="coins_svg__a"><stop stop-color="#F6C430" offset="0%"></stop><stop stop-color="#FFECAA" offset="50.092%"></stop><stop stop-color="#F6B813" offset="100%"></stop></linearGradient><linearGradient x1="76.302%" y1="87.131%" x2="19.387%" y2="13.87%" id="coins_svg__b"><stop stop-color="#F99D00" offset="0%"></stop><stop stop-color="#FFC20D" offset="50.721%"></stop><stop stop-color="#E9A603" offset="100%"></stop></linearGradient><linearGradient x1="32.954%" y1="10.4%" x2="70.248%" y2="90.053%" id="coins_svg__g"><stop stop-color="#FFEC88" offset="0%"></stop><stop stop-color="#FDF4CB" offset="51.842%"></stop><stop stop-color="#FAE17A" offset="100%"></stop></linearGradient><filter x="-5.6%" y="-5.6%" width="111.1%" height="111.1%" filterUnits="objectBoundingBox" id="coins_svg__d"><feGaussianBlur stdDeviation="0.5" in="SourceAlpha" result="shadowBlurInner1"></feGaussianBlur><feOffset in="shadowBlurInner1" result="shadowOffsetInner1"></feOffset><feComposite in="shadowOffsetInner1" in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowInnerInner1"></feComposite><feColorMatrix values="0 0 0 0 0.796078431 0 0 0 0 0.447058824 0 0 0 0 0 0 0 0 1 0" in="shadowInnerInner1"></feColorMatrix></filter><filter x="-51.3%" y="-16.3%" width="202.5%" height="165.3%" filterUnits="objectBoundingBox" id="coins_svg__e"><feOffset dy="1" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset><feGaussianBlur stdDeviation="0.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur><feColorMatrix values="0 0 0 0 0.819607843 0 0 0 0 0.22745098 0 0 0 0 0 0 0 0 1 0" in="shadowBlurOuter1"></feColorMatrix></filter><path d="M6 10.5a4.5 4.5 0 100-9 4.5 4.5 0 000 9z" id="coins_svg__c"></path><path d="M4.155 8.058v.002c-.063.099-.089.14-.103.165-.05.076-.043.11.032.177.174.149.399.304.55.382.422.217.877.332 1.36.342.31.017.702-.061.994-.198.527-.248.863-.73.922-1.326.096-.964-.5-1.567-2.034-2.052-.716-.243-1.052-.566-1.052-1.017.021-.498.46-.87 1.052-.893.476.001.897.135 1.312.415.087.056.127.046.186-.034.007-.012.025-.041.104-.16.073-.11.097-.148.103-.159.05-.098.043-.136-.046-.202a3.102 3.102 0 00-.478-.262 2.95 2.95 0 00-1.206-.237c-.922.02-1.642.652-1.69 1.481-.03.599.26 1.08.862 1.436a9.1 9.1 0 001.075.429c.82.252 1.248.718 1.16 1.266-.081.499-.577.83-1.273.853-.505-.01-1.014-.206-1.456-.555a7.857 7.857 0 01-.034-.027l-.033-.026c-.09-.065-.143-.06-.198.026l-.109.174" id="coins_svg__f"></path></defs><g fill="none" fill-rule="evenodd"><circle fill="url(#coins_svg__a)" cx="6" cy="6" r="6"></circle><path d="M.24 6.24v-.098C.24 2.882 2.819.24 6 .24c3.181 0 5.76 2.642 5.76 5.902v.098C11.707 3.026 9.15.437 6 .437S.292 3.026.24 6.24z" fill="#FFF5C9"></path><use fill="url(#coins_svg__b)" xlink:href="#coins_svg__c"></use><use fill="#000" filter="url(#coins_svg__d)" xlink:href="#coins_svg__c"></use><path d="M2.913 9.274a4.5 4.5 0 006.361-6.361 4.5 4.5 0 11-6.361 6.361z" fill="#FFEEAD"></path><path d="M2.945 9.305a4.5 4.5 0 116.36-6.36 4.5 4.5 0 00-6.36 6.36z" fill="#C00C00"></path><g><use fill="#000" filter="url(#coins_svg__e)" xlink:href="#coins_svg__f"></use><use fill="url(#coins_svg__g)" xlink:href="#coins_svg__f"></use></g></g></svg></div>0</span><span class="m-LiveList-CardTips-card-tag m-LiveList-CardTips-card-viewers"><span class="m-LiveList-CardTips-card-viewers-count" style="font-size: 12px;">00:00</span></span></div><div class="m-LiveList-VoucherSign"><button class="m-LiveList-VoucherSign-content"><div class="m-LiveList-VoucherSign-text" style="font-size: 10px;">Kết thúc</div></button><div class="m-LiveList-VoucherSign-angle"></div></div><div class="card-dimmer"></div><div class="current-live-card-info-wrap"><div class="m-LiveList-LiveInfo light"><div class="card-title"></div><div class="card-profile"><div class="shopee-avatar card-avatar"><div class="Image__ImageWrap-sc-1ti521m-0 gzjLN shopee-image" style="width: 100%; height: 100%; background: url(&quot;data:image/png;base64,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&quot;) center center / 100% no-repeat;"></div></div><span class="card-name"></span></div></div></div></div>`
                var xhr = new XMLHttpRequest();
                xhr.open("GET", `https://live.shopee.vn/api/v1/session/${ssid}`, true);
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        var responseData = JSON.parse(xhr.responseText);
                        element.id = responseData.data.session.session_id;
			fetchData(responseData.data.session.session_id);
                        element.getElementsByClassName("card-title")[0].textContent = responseData.data.session.title;
                        element.getElementsByClassName("card-name")[0].textContent = responseData.data.session.nickname;
                        element.getElementsByClassName("visible cover")[0].src = "https://cf.shopee.vn/file/" + responseData.data.session.cover_pic;
                        element.getElementsByClassName("m-LiveList-VoucherSign-content")[0].setAttribute("onclick",`end_element(${ssid})`)
                    } else {
                        console.error("Yêu cầu thất bại");
                    }
                };
                xhr.send();
                break
            }
        }
}

function end_element(ssid) {
    document.getElementById(ssid).innerHTML = "";
    document.getElementById(ssid).id = "none"
}

function add() {
    ss = new URL(document.getElementById("userInput").value).searchParams.get("session");
    add_element(ss);
    //fetchData(ss);
    document.getElementById("userInput").value = "";
}
