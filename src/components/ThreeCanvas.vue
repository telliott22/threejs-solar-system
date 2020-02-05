<template>
  <div id="container" />
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import { OrbitControls } from "../helpers/OrbitControls";
import { Interaction } from "three.interaction";
import {
  BloomEffect,
  KernelSize,
  ToneMappingEffect,
  BlendFunction,
  EffectComposer,
  EffectPass,
  RenderPass
} from "postprocessing";
import CameraControls from "camera-controls";

CameraControls.install({ THREE: THREE });

import { mapState } from "vuex";

export default {
  name: "ThreeCanvas",
  components: {},
  data() {
    return {
      system: {
        orbitsRotating: true
      },
      objects: {
        planets: {},
        orbits: {}
      },
      geometry: {}
    };
  },
  computed: {
    ...mapState(["selectedPlanet", "planetRotation"])
  },
  watch: {
    selectedPlanet(newVal, oldVal) {
      this.oldWorldPosition = this.objects.planets[oldVal].getWorldPosition();

      this.focusOnPlanet(newVal);
    },
    planetRotation(newVal) {
      this.objects.planets.uranus.rotation.z = newVal.z;
      this.objects.planets.uranus.rotation.x = newVal.x;
    }
  },
  mounted() {
    this.init();

    this.animate();
  },
  methods: {
    async init() {
      this.system.clock = new THREE.Clock();

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
      this.system.renderer.setClearColor(0x000111, 0.5);

      /*
        Init camera
      */

      this.system.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        1,
        1500
      );
      // this.system.camera.position.z = 50;
      // this.system.camera.position.x = 20;
      // this.system.camera.position.y = 40;
      // this.system.camera.lookAt(0, 0, 0);

      this.system.scene.add(this.system.camera);

      const interaction = new Interaction(
        this.system.renderer,
        this.system.scene,
        this.system.camera
      );

      /*
        Mouse controls for scene
      */

      this.system.orbitControls = new CameraControls(
        this.system.camera,
        this.system.renderer.domElement
      );

      // this.system.orbitControls = new OrbitControls(
      //   this.system.camera,
      //   this.system.renderer.domElement
      // );

      this.system.orbitControls.setLookAt(50, 20, 40, 0, 0, 0);
      this.system.orbitControls.autoRotate = false;
      this.system.orbitControls.minDistance = 3;
      this.system.orbitControls.maxDistance = 200;

      /*
        Create light sources
      */

      this.system.light = new THREE.AmbientLight(0xffd3ba, 0.3); // soft white light
      this.system.scene.add(this.system.light);

      this.system.pointLight = new THREE.PointLight(0xffd3ba, 3);
      this.system.scene.add(this.system.pointLight);

      /*
        Background
      */
      this.system.scene.background = new THREE.CubeTextureLoader()
        .setPath("/background/")
        .load(["px.jpg", "nx.jpg", "py.jpg", "ny.jpg", "pz.jpg", "nz.jpg"]);

      /*
        solarSystem
      */

      this.objects.orbits.solarSystem = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.solarSystem);

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

      this.system.loader = new GLTFLoader();

      let $this = this;

      this.system.loader.load("/models/sun/scene.gltf", gltf => {
        $this.objects.planets.sun = gltf.scene;
        $this.objects.planets.sun.scale.set(0.5, 0.5, 0.5);
        $this.objects.planets.sun.maxZoom = 80;
        $this.objects.orbits.solarSystem.add($this.objects.planets.sun);
      });

      /*
        Mercury
      */
      this.objects.orbits.mercuryOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.mercuryOrbit);

      this.system.loader.load("/models/mercury/scene.gltf", gltf => {
        $this.objects.planets.mercury = gltf.scene;
        $this.objects.planets.mercury.scale.set(0.3, 0.3, 0.3);
        this.objects.planets.mercury.position.x = 10;
        $this.objects.planets.mercury.maxZoom = 1;
        $this.objects.orbits.mercuryOrbit.add($this.objects.planets.mercury);
      });

      /*
      /*
        Venus
      */
      this.objects.orbits.venusOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.venusOrbit);

      this.system.loader.load("/models/venus/scene.gltf", gltf => {
        $this.objects.planets.venus = gltf.scene;
        $this.objects.planets.venus.scale.set(0.35, 0.35, 0.35);
        this.objects.planets.venus.position.x = 15;
        $this.objects.planets.venus.maxZoom = 2;
        $this.objects.orbits.venusOrbit.add($this.objects.planets.venus);
      });

      /*
        Earth
      */
      this.objects.orbits.earthOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.earthOrbit);

      this.system.loader.load("/models/earth/scene.gltf", async gltf => {
        $this.objects.planets.earth = await gltf.scene;
        $this.objects.planets.earth.scale.set(0.5, 0.5, 0.5);
        $this.objects.planets.earth.position.x = 20;
        $this.objects.planets.earth.maxZoom = 2;
        $this.objects.orbits.earthOrbit.add($this.objects.planets.earth);

        /*
          Moon
        */

        this.objects.orbits.moonOrbit = new THREE.Object3D();
        this.objects.orbits.moonOrbit.position.x = 1.5;
        this.objects.orbits.moonOrbit.position.y = 0.5;
        this.objects.planets.earth.add(this.objects.orbits.moonOrbit);

        this.system.loader.load("/models/moon/scene.gltf", gltf => {
          $this.objects.planets.moon = gltf.scene;
          $this.objects.planets.moon.scale.set(0.2, 0.2, 0.2);
          $this.objects.orbits.moonOrbit.add($this.objects.planets.moon);
        });
      });

      /*
        Mars
      */
      this.objects.orbits.marsOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.marsOrbit);

      this.system.loader.load("/models/mars/scene.gltf", gltf => {
        $this.objects.planets.mars = gltf.scene;
        $this.objects.planets.mars.scale.set(0.5, 0.5, 0.5);
        $this.objects.planets.mars.position.x = 25;
        $this.objects.planets.mars.maxZoom = 2;
        $this.objects.orbits.marsOrbit.add($this.objects.planets.mars);
      });

      /*
        Jupiter
      */
      this.objects.orbits.jupiterOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.jupiterOrbit);

      this.system.loader.load("/models/jupiter/scene.gltf", gltf => {
        $this.objects.planets.jupiter = gltf.scene;
        $this.objects.planets.jupiter.scale.set(1.1, 1.1, 1.1);
        $this.objects.planets.jupiter.position.x = 40;
        $this.objects.planets.jupiter.maxZoom = 10;
        $this.objects.orbits.jupiterOrbit.add($this.objects.planets.jupiter);
      });

      /*
        Saturn
      */
      this.objects.orbits.saturnOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.saturnOrbit);

      this.system.loader.load("/models/saturn/scene.gltf", gltf => {
        $this.objects.planets.saturn = gltf.scene;
        $this.objects.planets.saturn.scale.set(0.01, 0.01, 0.01);
        $this.objects.planets.saturn.position.x = 50;
        $this.objects.planets.saturn.maxZoom = 10;
        $this.objects.orbits.saturnOrbit.add($this.objects.planets.saturn);
      });

      /*
        Uranus
      */
      this.objects.orbits.uranusOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.uranusOrbit);

      this.system.loader.load("/models/uranus/scene.gltf", gltf => {
        $this.objects.planets.uranus = gltf.scene;
        $this.objects.planets.uranus.scale.set(0.004, 0.004, 0.004);
        $this.objects.planets.uranus.position.x = 60;
        $this.objects.planets.uranus.maxZoom = 8;
        $this.objects.orbits.uranusOrbit.add($this.objects.planets.uranus);
      });

      /*
        Neptune
      */
      this.objects.orbits.neptuneOrbit = new THREE.Object3D();
      this.system.scene.add(this.objects.orbits.neptuneOrbit);

      this.system.loader.load("/models/neptune/scene.gltf", gltf => {
        $this.objects.planets.neptune = gltf.scene;
        $this.objects.planets.neptune.scale.set(0.1, 0.1, 0.1);
        $this.objects.planets.neptune.position.x = 70;
        $this.objects.planets.neptune.maxZoom = 8;
        $this.objects.orbits.neptuneOrbit.add($this.objects.planets.neptune);
      });

      /*
        Planet functions
      */

      setTimeout(() => {
        for (const object in this.objects.planets) {
          if (this.objects.planets.hasOwnProperty(object)) {
            const element = this.objects.planets[object];

            element.cursor = "pointer";

            element.on("click", event => {
              $this.focusOnPlanet(object);
              $this.$store.dispatch("SELECT_PLANET", object);
            });
          }
        }
      }, 2000);

      /*
        Scene effects
      */
      this.system.composer = new EffectComposer(this.system.renderer);

      this.system.renderPass = new RenderPass(
        this.system.scene,
        this.system.camera
      );
      this.system.composer.addPass(this.system.renderPass);

      const bloomOptions = {
        blendFunction: BlendFunction.SCREEN,
        kernelSize: KernelSize.MEDIUM,
        luminanceThreshold: 4,
        luminanceSmoothing: 1,
        height: 2000
      };

      const bloomEffectPass = new EffectPass(
        this.system.camera,
        new BloomEffect(bloomOptions)
      );

      bloomEffectPass.renderToScreen = true;

      this.system.composer.addPass(bloomEffectPass);

      // const toneMappingEffect = new ToneMappingEffect({
      //   blendFunction: BlendFunction.NORMAL,
      //   adaptive: true,
      //   resolution: 256,
      //   middleGrey: 0.6,
      //   maxLuminance: 16.0,
      //   averageLuminance: 1.0,
      //   adaptationRate: 2.0
      // });

      // const toneMappingPass = new EffectPass(
      //   this.system.camera,
      //   toneMappingEffect
      // );

      // toneMappingPass.dithering = true;
      // this.system.renderPass.renderToScreen = false;
      // toneMappingPass.renderToScreen = true;

      // this.system.composer.addPass(toneMappingPass);
    },
    animate() {
      requestAnimationFrame(this.animate);
      this.render();
    },
    rotatePlanets() {
      this.rotate(this.objects.planets.sun, 0.1);

      this.rotate(this.objects.planets.mercury, 0.3);

      this.rotate(this.objects.planets.venus, 2);

      this.rotate(this.objects.planets.earth);

      this.rotate(this.objects.planets.moon, 8);

      this.rotate(this.objects.planets.mars, 0.8);

      this.rotate(this.objects.planets.jupiter, 2);

      this.rotate(this.objects.planets.saturn, 4);

      this.rotate(this.objects.planets.uranus, 4, "z");

      this.rotate(this.objects.planets.neptune, 3);
    },
    rotateOrbits() {
      this.rotate(this.objects.orbits.moonOrbit * 2);

      if (this.system.orbitsRotating) {
        this.rotate(this.objects.orbits.mercuryOrbit, 4);

        this.rotate(this.objects.orbits.venusOrbit, 3);

        this.rotate(this.objects.orbits.earthOrbit);

        this.rotate(this.objects.orbits.marsOrbit, 0.7);

        this.rotate(this.objects.orbits.jupiterOrbit, 0.5);

        this.rotate(this.objects.orbits.saturnOrbit, 0.3);

        this.rotate(this.objects.orbits.uranusOrbit, 0.1);

        this.rotate(this.objects.orbits.neptuneOrbit, 0.05);
      }
    },
    render() {
      this.rotatePlanets();
      this.rotateOrbits();

      const delta = this.system.clock.getDelta();
      const updated = this.system.orbitControls.update(delta);

      if (updated) {
        this.system.composer.render();
      }

      // this.system.renderer.render(this.system.scene, this.system.camera);
    },
    // timer(ms) {
    //   return new Promise(res => setTimeout(res, ms));
    // },
    rotate(object, multiplier = 1, rotationDirection = "y") {
      if (object) {
        var elapsedMilliseconds = Date.now() - this.system.startTime;
        var elapsedSeconds = elapsedMilliseconds / 1000;

        let rotationSpeed = elapsedSeconds * 0.1;

        object.rotation[rotationDirection] = rotationSpeed * multiplier;
      }
    },
    async focusOnPlanet(planetName) {
      let planet = this.objects.planets[planetName];

      if (planet) {
        let planetPosition = planet.getWorldPosition();

        // if (this.selectedPlanet != planetName) {
        ///Stop planets orbiting when they're focused on
        if (planetName === "sun") {
          this.system.orbitsRotating = true;
        } else {
          this.system.orbitsRotating = false;
        }

        this.system.orbitControls.setTarget(
          planetPosition.x,
          planetPosition.y,
          planetPosition.z,
          planetPosition.x,
          planetPosition.y,
          planetPosition.z,
          true
        );

        console.log("planet.maxZoom", planet.maxZoom);

        this.system.orbitControls.dollyTo(planet.maxZoom);

        // // let newWolrdPoi
        // let currentWorldPosition = this.oldWorldPosition;

        // let differenceBetweenPositions = {
        //   z: currentWorldPosition.z - futureWorldPosition.z,
        //   x: currentWorldPosition.x - futureWorldPosition.x,
        //   y: currentWorldPosition.y - futureWorldPosition.y
        // };

        // let startIndex = 30;
        // let index = startIndex;

        // do {
        //   currentWorldPosition.z =
        //     futureWorldPosition.z +
        //     (differenceBetweenPositions.z / startIndex) * index;

        //   currentWorldPosition.x =
        //     futureWorldPosition.x +
        //     (differenceBetweenPositions.x / startIndex) * index;

        //   currentWorldPosition.y =
        //     futureWorldPosition.y +
        //     (differenceBetweenPositions.y / startIndex) * index;

        //   index--;

        //   console.log("planet.maxZoom", planet.maxZoom);

        //   // let reverseIndex = index;

        //   // let dollyAmount =
        //   //    planet.maxZoom;

        //   // console.log("dollyAmount", dollyAmount);

        //   // this.system.orbitControls.dollyIn(planet.maxZoom);

        //   // console.log(
        //   //   "this.system.camera.position.z",
        //   //   this.system.camera.position.z
        //   // );

        //   // this.system.camera.position.z =
        //   //   currentWorldPosition.z + planet.maxZoom;

        //   // this.system.camera.updateProjectionMatrix();

        //   // console.log(
        //   //   "this.system.camera.position.z",
        //   //   this.system.camera.position.z
        //   // );

        //   this.system.orbitControls.target = currentWorldPosition;

        //   this.system.orbitControls.update();

        //   await this.timer(15);
        // } while (index > 0);

        // this.system.orbitControls.dolly(planet.maxZoom);

        // // do {
        // //   if (
        // //     Math.floor(currentWorldPosition.z) <
        // //     Math.floor(futureWorldPosition.z)
        // //   ) {
        // //     currentWorldPosition.z++;
        // //   } else if (
        // //     Math.floor(currentWorldPosition.z) >
        // //     Math.floor(futureWorldPosition.z)
        // //   ) {
        // //     currentWorldPosition.z--;
        // //   }

        // //   if (
        // //     Math.floor(currentWorldPosition.x) <
        // //     Math.floor(futureWorldPosition.x)
        // //   ) {
        // //     currentWorldPosition.x++;
        // //   } else if (
        // //     Math.floor(currentWorldPosition.x) >
        // //     Math.floor(futureWorldPosition.x)
        // //   ) {
        // //     currentWorldPosition.x--;
        // //   }

        // //   if (
        // //     Math.floor(currentWorldPosition.y) <
        // //     Math.floor(futureWorldPosition.y)
        // //   ) {
        // //     currentWorldPosition.y++;
        // //   } else if (
        // //     Math.floor(currentWorldPosition.y) >
        // //     Math.floor(futureWorldPosition.y)
        // //   ) {
        // //     currentWorldPosition.y--;
        // //   }

        // //   // console.log("currentWorldPosition", currentWorldPosition);
        // //   // console.log("futureWorldPosition", futureWorldPosition);

        // //   this.system.orbitControls.target = currentWorldPosition;

        // //   this.system.orbitControls.update();

        // //   await this.timer(20);
        // // } while (
        // //   Math.floor(currentWorldPosition.z) !==
        // //     Math.floor(futureWorldPosition.z) ||
        // //   Math.floor(currentWorldPosition.y) !==
        // //     Math.floor(futureWorldPosition.y) ||
        // //   Math.floor(currentWorldPosition.x) !==
        // //     Math.floor(futureWorldPosition.x)
        // // );

        // // this.system.orbitControls.dollyIn(1);
        // // this.system.orbitControls.update();

        // // this.system.orbitControls.target = futureWorldPosition;
        // // this.system.orbitControls.dollyIn(10);

        // // this.system.orbitControls.update();
        // // }
      }
    }
  }
};
</script>







