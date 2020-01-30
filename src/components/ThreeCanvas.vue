<template>
  <div id="container" />
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  name: "ThreeCanvas",
  components: {},
  data() {
    return {
      system: {},
      objects: {},
      geometry: {}
    };
  },
  mounted() {
    this.system.clicked = false;

    this.init();

    this.animate();
  },
  methods: {
    async init() {
      this.system.container = document.getElementById("container");

      this.system.scene = new THREE.Scene();

      this.system.startTime = Date.now();

      /*
        Init renderer 
      */

      this.system.renderer = new THREE.WebGLRenderer();
      this.system.renderer.setPixelRatio(
        window.devicePixelRatio ? window.devicePixelRatio : 1
      );
      this.system.container.appendChild(this.system.renderer.domElement);
      this.system.renderer.setSize(window.innerWidth, window.innerHeight);

      /*
        Init camera
      */

      this.system.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1500
      );
      this.system.camera.position.z = 50;
      this.system.camera.position.x = 100;
      this.system.camera.position.y = 100;
      this.system.camera.lookAt(0, 0, 0);

      this.system.scene.add(this.system.camera);

      /*
        Mouse controls for scene
      */

      this.system.orbitControls = new OrbitControls(
        this.system.camera,
        this.system.renderer.domElement
      );
      this.system.orbitControls.autoRotate = false;

      /*
        Create light sources
      */

      this.system.light = new THREE.AmbientLight(0xffd3ba, 2); // soft white light
      this.system.scene.add(this.system.light);

      this.system.pointLight = new THREE.PointLight(0xfffff, 2);
      this.system.scene.add(this.system.pointLight);

      /*
        solarSystem
      */

      this.objects.solarSystem = new THREE.Object3D();
      this.system.scene.add(this.objects.solarSystem);

      /*
        Sun
      */

      //Create sphere geometry to reuse
      const radius = 1;
      const widthSegments = 10;
      const heightSegments = 10;
      this.geometry.sphere = new THREE.SphereBufferGeometry(
        radius,
        widthSegments,
        heightSegments
      );

      if (!this.system.loader) {
        this.system.loader = new GLTFLoader();
      }

      let $this = this;

      this.system.loader.load("/models/sun/scene.gltf", gltf => {
        $this.objects.sun = gltf.scene;
        $this.objects.sun.scale.set(0.5, 0.5, 0.5);
        $this.objects.solarSystem.add($this.objects.sun);
      });

      /*
        Mercury
      */
      this.objects.mercuryOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.mercuryOrbit);

      // const mercuryMaterial = new THREE.MeshPhongMaterial({
      //   color: 0xa37c40,
      //   emissive: 0xa37c40
      // });
      // this.objects.mercury = new THREE.Mesh(
      //   this.geometry.sphere,
      //   mercuryMaterial
      // );
      // this.objects.mercury.scale.set(0.4, 0.4, 0.4);
      // this.objects.mercury.position.x = 10;
      // this.objects.mercuryOrbit.add(this.objects.mercury);

      this.system.loader.load("/models/mercury/scene.gltf", gltf => {
        $this.objects.mercury = gltf.scene;
        $this.objects.mercury.scale.set(0.3, 0.3, 0.3);
        this.objects.mercury.position.x = 10;
        $this.objects.mercuryOrbit.add($this.objects.mercury);
      });

      /*
      /*
        Venus
      */
      this.objects.venusOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.venusOrbit);

      this.system.loader.load("/models/venus/scene.gltf", gltf => {
        $this.objects.venus = gltf.scene;
        $this.objects.venus.scale.set(0.35, 0.35, 0.35);
        this.objects.venus.position.x = 15;
        $this.objects.venusOrbit.add($this.objects.venus);
      });

      // const venusMaterial = new THREE.MeshPhongMaterial({
      //   color: 0xd2a931,
      //   emissive: 0xd2a931
      // });

      // this.objects.venus = new THREE.Mesh(this.geometry.sphere, venusMaterial);
      // this.objects.venus.scale.set(0.6, 0.6, 0.6);
      // this.objects.venus.position.x = 15;
      // this.objects.venusOrbit.add(this.objects.venus);

      /*
        Earth
      */
      this.objects.earthOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.earthOrbit);

      // const earthMaterial = new THREE.MeshPhongMaterial({
      //   color: 0x2233ff,
      //   emissive: 0x112244
      // });
      // this.objects.earth = new THREE.Mesh(this.geometry.sphere, earthMaterial);
      // this.objects.earthOrbit.add(this.objects.earth);
      // this.objects.earth.position.x = 20;

      this.system.loader.load("/models/earth/scene.gltf", async gltf => {
        $this.objects.earth = await gltf.scene;
        $this.objects.earth.scale.set(0.5, 0.5, 0.5);
        $this.objects.earth.position.x = 20;
        $this.objects.earthOrbit.add($this.objects.earth);

        /*
          Moon
        */

        this.objects.moonOrbit = new THREE.Object3D();
        this.objects.moonOrbit.position.x = 2;
        this.objects.earth.add(this.objects.moonOrbit);

        const moonMaterial = new THREE.MeshPhongMaterial({
          color: 0x888888,
          emissive: 0x222222
        });

        this.objects.moon = new THREE.Mesh(this.geometry.sphere, moonMaterial);
        this.objects.moon.scale.set(0.2, 0.2, 0.2);

        this.objects.moonOrbit.add(this.objects.moon);
      });

      /*
        Mars
      */
      this.objects.marsOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.marsOrbit);

      this.system.loader.load("/models/mars/scene.gltf", gltf => {
        $this.objects.mars = gltf.scene;
        $this.objects.mars.scale.set(0.5, 0.5, 0.5);
        $this.objects.mars.position.x = 25;
        $this.objects.marsOrbit.add($this.objects.mars);
      });
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    render() {
      this.rotate(this.objects.sun, 0.1);

      this.rotate(this.objects.mercuryOrbit, 4);
      this.rotate(this.objects.mercury, 0.3);

      this.rotate(this.objects.venusOrbit, 3);

      this.rotate(this.objects.earthOrbit);
      this.rotate(this.objects.earth);

      this.rotate(this.objects.moonOrbit);

      this.rotate(this.objects.marsOrbit, 0.5);

      this.system.renderer.render(this.system.scene, this.system.camera);

      // for (const object in this.objects) {
      //   if (this.objects.hasOwnProperty(object)) {
      //     const element = this.objects[object];

      //     // element.rotation.y = elapsedSeconds;

      //     const axes = new THREE.AxesHelper();
      //     axes.material.depthTest = false;
      //     axes.renderOrder = 1;
      //     element.add(axes);
      //   }
      // }
    },
    rotate(object, multiplier = 1) {
      if (object) {
        var elapsedMilliseconds = Date.now() - this.system.startTime;
        var elapsedSeconds = elapsedMilliseconds / 1000;

        let rotationSpeed = elapsedSeconds * 0.5;

        object.rotation.y = rotationSpeed * multiplier;
      }
    },
    loadModel(path) {
      if (!this.system.loader) {
        this.system.loader = new GLTFLoader();
      }

      console.log(path);

      let tempObject;

      this.system.loader.load(
        path,
        function(gltf) {
          console.log(gltf);

          tempObject = gltf.scene;
        },
        undefined,
        function(error) {
          console.error(error);
        }
      );

      console.log("tempObject", tempObject);

      return tempObject;
    }
  }
};
</script>







