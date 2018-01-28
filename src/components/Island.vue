<template>
  <div class='island' id='island'></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import config from 'config';

const { WIREFRAME_MODE } = config;

class Island extends THREE.Object3D {
  constructor(props) {
    super();

    this.noise = props.noise;
    this.sideLength = props.sideLength;
    this.flatShading = false;
    this.height = 2;
    this.rotation.x = -Math.PI / 2;
    this.rotation.z = -Math.PI / 4;

    console.log('Initialising island terrain with props', props);

    this._generateLand();
    this._generateWater();
  }
  _generateLand() {
    const terrainGeom = new THREE.PlaneGeometry(10, 10, this.sideLength - 1, this.sideLength - 1);
    const material = new THREE.MeshLambertMaterial({ color: 0x6a9c6c, wireframe: WIREFRAME_MODE });
    const terrainMesh = new THREE.Mesh(terrainGeom, material);

    const verts = terrainMesh.geometry.vertices;
    const l = verts.length;

    for (let i = 0; i < l; i++) {
      const v = verts[i];
      // need to update Z to go up in Y axis becasue of the rotation on this
      v.z = this.noise[i] * this.height;
    }

    terrainMesh.material.needsUpdate = true;
    this.add(terrainMesh);
  }
  _generateWater() {
    const waterGeom = new THREE.PlaneGeometry(10, 10, 1, 1);
    const beachMaterial = new THREE.MeshLambertMaterial({
      color: 0xfff8bd,
      wireframe: WIREFRAME_MODE,
      transparent: true,
      depthWrite: false,
      opacity: 0.7
    });
    const shallowWaterMaterial = new THREE.MeshLambertMaterial({
      color: 0x33949e,
      wireframe: WIREFRAME_MODE,
      transparent: true,
      depthWrite: false,
      opacity: 0.9
    });
    const deepWaterMaterial = new THREE.MeshLambertMaterial({
      color: 0x000066,
      wireframe: WIREFRAME_MODE
    });
    const beachMesh = new THREE.Mesh(waterGeom, beachMaterial);
    beachMesh.position.z = this.height * 0.5;
    this.add(beachMesh);

    const shallowWaterMesh = new THREE.Mesh(waterGeom, shallowWaterMaterial);
    shallowWaterMesh.position.z = this.height * 0.44;
    this.add(shallowWaterMesh);

    const deepWaterMesh = new THREE.Mesh(waterGeom, deepWaterMaterial);
    deepWaterMesh.position.z = this.height * 0.35;
    this.add(deepWaterMesh);

    const sideMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      wireframe: WIREFRAME_MODE,
      side: THREE.DoubleSide
    });

    const sides = [];
    const sideGeom = new THREE.PlaneGeometry(10, 1, 1, 1);
    // front
    sides.push(new THREE.Mesh(sideGeom, sideMaterial));
    sides[0].rotation.x = Math.PI / 2;
    sides[0].position.y = -5;
    sides[0].position.z = this.height * 0.25;
    // back
    sides.push(new THREE.Mesh(sideGeom, sideMaterial));
    sides[1].rotation.x = Math.PI / 2;
    sides[1].position.y = 5;
    sides[1].position.z = this.height * 0.25;
    // left
    sides.push(new THREE.Mesh(sideGeom, sideMaterial));
    sides[2].rotation.x = Math.PI / 2;
    sides[2].rotation.y = Math.PI / 2;
    sides[2].position.x = 5;
    sides[2].position.z = this.height * 0.25;
    // right
    sides.push(new THREE.Mesh(sideGeom, sideMaterial));
    sides[3].rotation.x = Math.PI / 2;
    sides[3].rotation.y = Math.PI / 2;
    sides[3].position.x = -5;
    sides[3].position.z = this.height * 0.25;

    for (let i = 0; i < sides.length; i++) {
      this.add(sides[i]);
    }
  }
  update(delta) {

  }
}

export default {
  name: 'Island',
  computed: {
    ...mapGetters([
      'noise',
      'sideLength'
    ])
  },
  mounted: function() {
    /// INIT
    let HEIGHT = this.$el.offsetWidth;
    let WIDTH = this.$el.offsetWidth;

    // Create the scene
    const scene = new THREE.Scene();

    // scene.fog = new THREE.Fog(0xc6ccff, 5, 10);

    // Create the camera
    const aspectRatio = WIDTH / HEIGHT;
    const fieldOfView = 60;
    const nearPlane = 0.1;
    const farPlane = 60;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: false
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 1);
    renderer.setSize(WIDTH, HEIGHT);
    this.$el.appendChild(renderer.domElement);

    const light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1);
    scene.add(light);

    const sun = new THREE.DirectionalLight(0xffffff, 0.6);
    sun.position.set(0, 10, 10);

    scene.add(sun);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.8;
    controls.enableZoom = true;
    controls.maxDistance = 30;
    controls.minDistance = 8;
    controls.maxPolarAngle = Math.PI * 0.4;

    const handleWindowResize = () => {
      const el = document.getElementById('island');
      // update height and width of the renderer and the camera
      HEIGHT = el.offsetHeight;
      WIDTH = el.offsetWidth;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };

    const render = () => {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();
      island.update(delta, elapsed);
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    };

    window.addEventListener('resize', handleWindowResize, false)

    //set camera at eyes height
    camera.position.y = 10;
    camera.position.z = 30; // how far to zoom out
    controls.target.set(0, 0, 0);

    // create snow
    const island = new Island({ noise: this.noise, sideLength: this.sideLength });
    scene.add(island);

    // start render
    const clock = new THREE.Clock();
    render();
  }
}
</script>

<style lang='scss'>
.island {
  width: 100%;
  height: 400px;
  background: hotpink;
  position: relative;
}
</style>
