<script setup>
  import { onMounted, ref } from 'vue';
  const mapRef = ref(null);

  var cacheSteps,
    polyLines,
    polylineOptions = {
      fillColor: '#E16E79',
      fillOpacity: 0.3,
      strokeColor: '#E16E79',
      strokeOpacity: 1,
      strokeWeight: 3,
    };

  function draw(result, drawMethod) {
    console.timeEnd('loadData');
    if (!result || !result.routes) return;
    try {
      polyLines = drawMethod(result.routes[0].legs[0].steps);
      console.log('polyLines', polyLines);
    } catch (error) {
      console.log(error);
    }
  }

  function loadData(localCompleteCallback) {
    console.time('loadData');
    $.get(bicycleRouteUrl, localCompleteCallback, 'json').fail(loadFail);
  }

  function loadFail(error) {
    console.log('loadFail', error);
  }

  function drawMulti() {
    if (!mapRef.value) return;
    remove();
    cacheSteps
      ? (polyLines = drawMultiPolyline(cacheSteps))
      : loadData(function (result) {
          draw(result, drawMultiPolyline);
        });
  }
  function filterAndCacheSteps(steps) {
    console.time('filterAndCacheSteps');
    console.log(steps);
    cacheSteps = steps.filter((step) => !!step.path);
    console.log('cacheSteps', cacheSteps);
    console.timeEnd('filterAndCacheSteps');
    return cacheSteps;
  }

  function drawMultiPolyline(steps) {
    if (!steps) return;
    console.time('drawMultiPolyline');
    var polyLines = filterAndCacheSteps(steps).map((step) => createPolyline(getPaths(step.path)));
    console.timeEnd('drawMultiPolyline');
    return polyLines;
  }

  function getPaths(path) {
    var paths = [],
      steps = path.split(' ');
    steps.map((step) => {
      var splitStep = step.split(',').map((point) => parseFloat(point)),
        latLng = new naver.maps.LatLng(splitStep[1], splitStep[0]);
      paths.push(latLng);
    });
    return paths;
  }

  function createPolyline(paths) {
    var polyline = new naver.maps.Polyline({
      map: map,
      path: paths,
      ...polylineOptions,
    });
    return polyline;
  }

  function remove() {
    if (!polyLines) return;
    polyLines.map((polyLine) => polyLine.setMap(null));
    polyLines.length = 0;
    polyLines = [];
  }

  onMounted(() => {
    console.log(naver);
    mapRef.value = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(36.3835833, 128.0344242),
      zoom: 8,
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
      },
    });

    console.log(drawMulti());
  });
</script>
<template>
  <div id="map" style="width: 100vw; height: 100vh"></div>
</template>
<style scoped></style>
