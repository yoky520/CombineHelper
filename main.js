  'use strick'
      function about() {
        alert('程序名称: Lot Combine Helper\n开发人员: yoky.chow@gmail.com\n功能简介: 本程序用于帮助员工快速拆并批！')
      };
      function calcCore(q,x,y,z) {
        let r0 = parseInt(q/y);//满盘盘数
        let r1 = parseInt(q/x);//满扎扎数
        let r2 = q % x;//尾数扎数量
        let r3 = parseInt(r2/y);//尾数扎满盘数量
        let r4 = r2 % y;//尾数扎尾盘数量
        let r5 = parseInt(r4/z);//尾盘满行数量
        let r6 = r4 % z;//尾盘尾行数量
        return [r0,r1,r2,r3,r4,r5,r6];
      };
      function dataVerify(x,y,z) {
        if ((x % y === 0 && y % z === 0 && x % z === 0) && (x / y >= 3 || x / y <= 10) && (z >= 4 && z <= 16)) {
          return true;
        } else return false;
      };
      function getData(qt) {
        let q;
        if (typeof(qt) === 'undefined'){
          q = document.getElementById('ipq').value;
        } else q = qt;
        let x = document.getElementById('ipx').value;
        let y = document.getElementById('ipy').value;
        let z = document.getElementById('ipz').value;
        if (dataVerify(x,y,z)){
          var [r0,r1,r2,r3,r4,r5,r6] = calcCore(q,x,y,z);
        } else return;
        let v0 = document.getElementById('r0');
        let v1 = document.getElementById('r1');
        let v2 = document.getElementById('r2');
        let v3 = document.getElementById('r3');
        let v4 = document.getElementById('r4');
        let v5 = document.getElementById('r5');
        let v6 = document.getElementById('r6');
        let v7 = document.getElementById('r7');
        v0.innerText = `${z}x${(y / z)}=${y}`;
        v7.innerText = q;
        if (r2 > 0) {
          v1.innerText = `${r1}+1`;
        } else {
          v1.innerText = r1;
        };
        v2.innerText = r2;
        if (r4 > 0) {
          v3.innerText = `${r3}+1`;
        } else {
          v3.innerText = r3;
        };
        if (r4 === 0) {
          v4.innerText = y;
        } else {
          v4.innerText = r4;
        };
        if (r6 != 0 && r6 < z) {
          v5.innerText = `${r5}+1`;
        }else if (r6 === 0 && r4 === 0) {
          v5.innerText = parseInt(y/z);
        }else{
          v5.innerText = r5;
        };
        if (r6 === 0) {
          v6.innerText = z;
        }else {
        v6.innerText = r6;
        };
      };
      function addData() {
        for (let i in data) {
          let [x,y,z] = data[i];
          let pm0 = document.getElementById('xdata');
          let cl0 = document.createElement('option');
          cl0.value = x;
          cl0.innerText = x;
          pm0.appendChild(cl0);
          let pm1 = document.getElementById('ydata');
          let cl1 = document.createElement('option');
          cl1.value = y;
          cl1.innerText = y;
          pm1.appendChild(cl1);
          let pm2 = document.getElementById('zdata');
          let cl2 = document.createElement('option');
          cl2.value = z;
          cl2.innerText = z;
          pm2.appendChild(cl2);
        };
      };
      function main(){
        addData();
        document.querySelector('#ipx').addEventListener('change', function() {
          for (let i in data) {
            let [x,y,z] = data[i];
            if (this.value === x.toString()) {
            document.querySelector('#ipc').value = x;
            document.querySelector('#ipy').value = y;
            document.querySelector('#ipz').value = z;
            };
          };
          if (document.getElementById('ipq').value){getData();};
        });
        document.querySelector('#ipq').addEventListener('change', function(){getData()});
        document.querySelector('#ipz').addEventListener('change', function(){getData()});
        document.querySelector('#ipa').addEventListener('change',function() {
          if (document.querySelector('#ipa').value){
            document.querySelector('#ipb').value = document.querySelector('#ipc').value - document.querySelector('#ipa').value;
            document.querySelector('#ipq').value = document.querySelector('#ipq').value - document.querySelector('#ipb').value;
            getData();
          } else return;
        });
        document.querySelector('#ipb').addEventListener('change',function() {
          if (document.querySelector('#ipa').value) {
            return;
          } else {
            if (document.querySelector('#ipq').value) {
              document.querySelector('#ipq').value = document.querySelector('#ipq').value - document.querySelector('#ipb').value;
          getData();
          }};
        });
      };
      function lotQuery(v) {
        let q = document.querySelector('#ipq').value;
        let c = document.querySelector('#ipc').value;
        let a = document.querySelector('#ipa').value;
        let b = document.querySelector('#ipb').value;
        if (v === 'q') {
          getData(q);
        };
        if (v === 'c') {
          getData(c);
        };
        if (v === 'a') {
          getData(a);
        };
        if (v === 'b') {
          getData(b);
        };
      };
      function wprint(){
        let oldStr = window.document.body.innerHTML;
        let start = '<!--startprint-->';
        let end = '<!--endprint-->';
        let newStr = oldStr.substr(oldStr.indexOf(start) + 17);
        newStr = newStr.substring(0,newStr.indexOf(end));
        window.document.body.innerHTML = newStr;
        window.print();
        window.document.body.innerHTML = oldStr;
        window.location.reload();
        return false;
      };
      main();
