<template>
  <canvas id="wave" style="position: absolute;width:  100%;height: 100%;left: 0;top: 0;"></canvas>
</template>

<script>
  export default {
    name: "WaveView",
    activated() {
      this.$nextTick(() => {
        let canvas = document.getElementById('wave');
        //获得画笔
        let ctx = canvas.getContext('2d');
        //canvas设置宽度
        canvas.width = canvas.parentNode.offsetWidth;
        //canvas设置高度
        canvas.height = canvas.parentNode.offsetHeight;

        //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
        window.requestAnimFrame = (function () {
          return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            function (callback) {
              window.setTimeout(callback, 1000 / 60);
            };
        })();
        // 波浪大小
        let boHeight = canvas.height / 5;
        // let posHeight = canvas.height / 1.2;
        let posHeights = [canvas.height / 1.12, canvas.height / 1.15, canvas.height / 1.2, canvas.height / 1.15, canvas.height / 1.12];

        //初始角度为0
        let step = 0;
        //定义三条不同波浪的颜色
        let lines = ["rgba(0,222,255, 0.2)", "rgba(157,192,249, 0.2)",
          "rgba(0,168,255, 0.2)", "rgba(157,192,249, 0.2)", "rgba(0,222,255, 0.2)"];

        function loop() {
          //清除canvas内容
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          step++;
          //画3个不同颜色的矩形
          for (let j = lines.length - 1; j >= 0; j--) {
            let posHeight = posHeights[j];
            ctx.fillStyle = lines[j];
            //每个矩形的角度都不同，每个之间相差45度
            let angle = (step + j * 90) * Math.PI / 180;
            let deltaHeight = Math.sin(angle) * boHeight;
            let deltaHeightRight = Math.cos(angle) * boHeight;
            ctx.beginPath();
            ctx.moveTo(0, posHeight + deltaHeight);
            ctx.bezierCurveTo(canvas.width / 2, posHeight + deltaHeight - boHeight, canvas.width / 2, posHeight + deltaHeightRight - boHeight, canvas.width, posHeight + deltaHeightRight);
            ctx.lineTo(canvas.width, canvas.height);
            ctx.lineTo(0, canvas.height);
            ctx.lineTo(0, posHeight + deltaHeight);
            ctx.closePath();
            ctx.fill();
          }
          requestAnimFrame(loop);
        }

        loop();
      });
    }
  }
</script>

<style scoped>

</style>
