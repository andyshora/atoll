<template>
  <div id='island' class='island'></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Island',
  computed: {
    ...mapGetters([
      'noise',
      'sideLength'
    ])
  },
  mounted: function() {
    const noise = new Noise(0.01);

    class Mountain extends THREE.Object3D {
      constructor(props) {
        super()

        this.rotation.x = -Math.PI / 2;
        this.noise = props.noise;

        this._tX = 0;
        this._tZ = 0;

        // settings
        this.size = 10;
        this.resolution = 10;  // dont make too high!
        this.height = 1;
        this.speed = 0;
        this.flatShading = false;

        var geom = new THREE.PlaneGeometry(
          this.size,
          this.size,
          this.size * this.resolution,
          this.size * this.resolution
        );
        var material = new THREE.MeshLambertMaterial({ color: 0x75da83, side: THREE.DoubleSide });
        this.mesh = new THREE.Mesh(geom, material);

        this.add(this.mesh);

        geom.mergeVertices();

        const l = geom.vertices.length;
        this.originals = [];
        for (let i = 0; i < l; i++) {
          const v = geom.vertices[i]

          // store some data associated to it
          this.originals.push({ x: v.x, y: v.y, z: v.z });
        }
      }

      moveWaves () {
        const verts = this.mesh.geometry.vertices;
        const l = verts.length;
        console.log(l, this.noise.length);

        for (let i = 0; i < l; i++) {
          const v = verts[i];
          // const original = this.originals[i];

          // need to update Z to go up in Y axis becasue of the rotation on this
          v.z = this.noise[i];
          // v.z = noise.perlin2(original.x + this._tX, original.y + this._tZ) * this.height;
        }

        // Update vertices and comput normals for shading
        this.mesh.geometry.verticesNeedUpdate = true;
        if (this.flatShading) {
          this.mesh.geometry.computeFlatVertexNormals();
        }
        else {
          this.mesh.geometry.computeVertexNormals();
        }
      }

      update (delta) {
        // debugger;
        //this._tX += this.speed * delta
        //this._tZ += this.speed * delta

        this.moveWaves();
      }
    }


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
    const farPlane = 30;
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );

    // Create the renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xc6ccff, 1);
    renderer.setSize(WIDTH, HEIGHT);
    this.$el.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
    dirLight.position.set(10, 1, -1);
    scene.add(dirLight);


    const controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    function handleWindowResize () {
      const el = document.getElementById('island');
      // update height and width of the renderer and the camera
      HEIGHT = el.offsetHeight;
      WIDTH = el.offsetWidth;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    }

    const render = () => {
      var delta = clock.getDelta()
      var elapsed = clock.getElapsedTime()
      mountain.update(delta, elapsed);
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(render);
    }


    //////////
    // INIT
    //////////
    window.addEventListener('resize', handleWindowResize, false)

    //set camera at eyes height
    camera.position.y = 3
    camera.position.z = 6
    controls.target.set(0, 0, 0)

    // create snow
    const mountain = new Mountain({ noise: this.noise });
    scene.add(mountain);

    // start render
    const clock = new THREE.Clock();
    render();


    // DAT GUI
    ////////////////////////
    /*
    function add(opt, min, max) {
      return gui.add(snowfall.opts, opt, min, max)
         .onChange(x => snowfall.updateProp(opt))
    }

    function addColor(opt) {
      return gui.addColor(snowfall.opts, opt)
         .onChange(x => snowfall.updateColor(opt))
    }

    const gui = new dat.GUI()
    add('speedV', 0, 1).step(0.01)
    add('speedH', 0, 10).step(0.01)
    add('radius', 0, 1).step(0.001)
    add('scale', 0, 10).step(0.01)
    add('opacity', 0, 1).step(0.01)
    addColor('color')
    gui.close()

    */
  }
}
</script>

<style lang='scss'>
.island {
  width: 100%;
  height: 100%;
  background: hotpink;
  position: relative;
}
</style>
