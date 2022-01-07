<template>
  <div id="container">
    <canvas class="webgl"></canvas>
  </div>
</template>

<script>
import * as THREE from 'three'
import gsap from 'gsap'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry} from 'three/examples/jsm/geometries/TextGeometry.js'
export default {
  components: {},
  data(){
    return{
      mtlLoader : null,
      objLoader : null
    }
  },
  props: [],
  mounted(){
    this.main3js();
  },
  methods: {
    main3js(){
      const container = document.getElementById('container');
      const scene = new THREE.Scene()
      // Sizes
      const sizes = {
        width: container.clientWidth,
        height: window.innerWidth / 12
      }
      // Camera
      const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height)
      camera.position.z = 175
      scene.add(camera)
      //Lights
      const ambiantLight = new THREE.AmbientLight(0xffffff, 0.5)
      scene.add(ambiantLight);
      const pointLight = new THREE.PointLight(0xffffff, 0.5)
      pointLight.position.x = -400
      pointLight.position.y = 0
      pointLight.position.z = 450
      scene.add(pointLight);
      const pointlight2 = pointLight.clone();
      pointLight.position.x = 0
      scene.add(pointlight2);
      const pointlight3 = pointLight.clone();
      pointlight3.position.x = 1400
      scene.add(pointlight3);
      // Renderer
      const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('canvas.webgl'),
        antialias: true
      })
      renderer.setSize(sizes.width, sizes.height)
      // test si animation en cours
      let animated = false
      //text Welcome-----------------------------
      const textureLoaderText = new THREE.TextureLoader()
      const colorText = textureLoaderText.load('/text/color.png')
      const materialtxt = new THREE.MeshPhysicalMaterial()
      materialtxt.map = colorText
      materialtxt.metalness = 0.3529
      materialtxt.roughness = 0.3312
      let txtNeedYou = null;
      let txtHowGreat = null;
      const fontLoader = new FontLoader()
      fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
        // Text NeedYou
        const textNeedYou = new TextGeometry("Tell the world ...", {
          font: font,
          size: 15,
          height: 0,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0,
          bevelSize: 0,
          bevelOffset: 0,
          bevelSegments: 5
        })
        textNeedYou.center()
        txtNeedYou = new THREE.Mesh(textNeedYou, materialtxt)
        txtNeedYou.position.x = -1100;
        txtNeedYou.position.y = 30;
        scene.add(txtNeedYou)
        //Text How great
        const textHowGreat = new TextGeometry("... how GREAT it was!", {
          font: font,
          size: 15,
          height: 0,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0,
          bevelSize: 0,
          bevelOffset: 0,
          bevelSegments: 5
        })
        textHowGreat.center()
        txtHowGreat = new THREE.Mesh(textHowGreat, materialtxt)
        txtHowGreat.position.x = 1100;
        txtHowGreat.position.y = -30;
        scene.add(txtHowGreat)
      })
      //text Welcome-----------------------------
      //text It's all up to you-----------------------------
      const textureLoaderText2 = new THREE.TextureLoader()
      const colorText2 = textureLoaderText2.load('/text/color2.png')
      const materialtxt2 = new THREE.MeshPhysicalMaterial()
      materialtxt2.map = colorText2
      materialtxt2.metalness = 0.7539
      materialtxt2.roughness = 0.3746
      // gui.add(materialtxt2, 'metalness').min(0).max(1).step(0.0001)
      // gui.add(materialtxt2, 'roughness').min(0).max(1).step(0.0001)
      let txtUpToYou = null;
      const fontLoader2 = new FontLoader()
      fontLoader2.load("/fonts/helvetiker_regular.typeface.json", (font) => {
        // Text NeedYou
        const textUpToYou = new TextGeometry("EATs ALL UP TO YOU", {
          font: font,
          size: 18,
          height: 0.2,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 3,
          bevelSize: 2,
          bevelOffset: 0,
          bevelSegments: 5
        })
        textUpToYou.center()
        txtUpToYou = new THREE.Mesh(textUpToYou, materialtxt2)
        txtUpToYou.position.x = -250;
        txtUpToYou.position.y = 600;
        txtUpToYou.rotateY(0.3)
        scene.add(txtUpToYou)
      })
      //text It's all up to you-----------------------------
      //texture LOGO-----------------------------
      const textureloader = new THREE.TextureLoader();
      const logoTextureColor = textureloader.load('/obj/color.jpg')
      let img_logo_loader = new THREE.TextureLoader();
      const imgLogoColorTexture = img_logo_loader.load('/images/logo_img/color.png')
      const imgLogoAlphaTexture = img_logo_loader.load('/images/logo_img/alpha.jpg')
      const imgLogoHeightTexture = img_logo_loader.load('/images/logo_img/height.png')
      let material_logo_img = new THREE.MeshPhysicalMaterial({});
      material_logo_img.map = imgLogoColorTexture
      material_logo_img.metalness = 0.3666
      material_logo_img.roughness = 0.2907
      material_logo_img.displacementMap = imgLogoHeightTexture
      material_logo_img.displacementScale = 2
      material_logo_img.transparent = true
      material_logo_img.alphaMap = imgLogoAlphaTexture
      let geometry_logo = new THREE.PlaneGeometry(35, 50, 100, 100);
      let img_logo_plane = new THREE.Mesh(geometry_logo, material_logo_img);
      img_logo_plane.position.set(-260,0,100)
      img_logo_plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(img_logo_plane.geometry.attributes.uv.array, 2))
      //Lets clone back logo !
      let img_logo_back = img_logo_plane.clone();
      img_logo_back.rotateY(Math.PI)
      scene.add(img_logo_plane, img_logo_back);
      //texture LOGO-----------------------------
      //BANNIERE BACK----------------------------
      let img_loader = new THREE.TextureLoader();
      const imgColorTexture = img_loader.load('/images/banner/color.png')
      const imgAlphaTexture = img_loader.load('/images/banner/alpha.jpg')
      let material_img = new THREE.MeshPhysicalMaterial({
        map: imgColorTexture
      });
      material_img.metalness = 0.1606
      material_img.roughness = 0.0197
      material_img.transparent = true
      material_img.alphaMap = imgAlphaTexture
      let geometry = new THREE.PlaneGeometry(800, 140, 10, 10);
      let img_plane = new THREE.Mesh(geometry, material_img);
      img_plane.position.set(-130,0,0)
      img_plane.scale.set(2,1,1)
      scene.add(img_plane);
      //BANNIERE BACK----------------------------
      //BANNIERE BACK2----------------------------
      let img_loader2 = new THREE.TextureLoader();
      const imgColorTexture2 = img_loader2.load('/images/banner2/color.png')
      const imgAlphaTexture2 = img_loader2.load('/images/banner2/alpha.jpg')
      let material_img2 = new THREE.MeshPhysicalMaterial({
        map: imgColorTexture2
      });
      material_img2.metalness = 0.1606
      material_img2.roughness = 0.0197
      material_img2.transparent = true
      material_img2.alphaMap = imgAlphaTexture2
      let geometry2 = new THREE.PlaneGeometry(800, 140, 10, 10);
      let img_plane2 = new THREE.Mesh(geometry2, material_img2);
      img_plane2.position.set(-130,0,0)
      img_plane2.scale.set(2,1,1)
      scene.add(img_plane2);
      //BANNIERE BACK2----------------------------
      //BANNIERE BACK3----------------------------
      let img_loader3 = new THREE.TextureLoader();
      const imgColorTexture3 = img_loader3.load('/images/banner3/color.png')
      const imgAlphaTexture3 = img_loader3.load('/images/banner3/alpha.jpg')
      let material_img3 = new THREE.MeshPhysicalMaterial({
        map: imgColorTexture3
      });
      material_img3.metalness = 0.1606
      material_img3.roughness = 0.0197
      material_img3.transparent = true
      material_img3.alphaMap = imgAlphaTexture3
      let geometry3 = new THREE.PlaneGeometry(800, 140, 10, 10);
      let img_plane3 = new THREE.Mesh(geometry3, material_img3);
      img_plane3.position.set(0,-1000,-500)
      scene.add(img_plane3);
      //BANNIERE BACK3----------------------------
      //Event
      window.addEventListener('resize', () => {
        // Update sizes
        sizes.width = container.clientWidth
        sizes.height = container.clientWidth / 12
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      })
      let logoMove1 = false
      window.addEventListener('scroll', function() {
        if (animated === false){
          if(window.pageYOffset >= 200 && !logoMove1) {
            animated = true
            gsap.to(img_plane.position, { duration: 1.2, delay: 0, x: -2100, y: -100 , z: -500})
            gsap.to(img_plane2.position, { duration: 1.2, delay: 0, x: -1165, y: -105 , z: -475})
            gsap.to(img_plane3.position, { duration: 1.35, delay: 0, x: -190, y: -39 , z: -50})
            gsap.to(img_logo_plane.position, { duration: 1, delay: 0, x: 0 })
            gsap.to(img_logo_back.position, { duration: 1, delay: 0, x: 0 })
            gsap.to(txtNeedYou.position, { duration: 1, delay: 0, x: -210 })
            gsap.to(txtHowGreat.position, { duration: 1, delay: 0, x: 220 })
            gsap.to(txtUpToYou.position, { duration: 1, delay: 0, x: 250, y: 50, z: -100 })
            gsap.to(txtUpToYou.rotation, { duration: 1, delay: 0, y: Math.PI * 1.9 })
            logoMove1 = true;
          }
          if(window.pageYOffset < 5 && logoMove1){
            animated = true
            gsap.to(img_plane.position, { duration: 1, delay: 0,x: -130, y: 0  , z: 0 })
            gsap.to(img_plane2.position, { duration: 1, delay: 0,x: -130, y: 0  , z: 0 })
            gsap.to(img_plane3.position, { duration: 1, delay: 0,x: -1000, y: -500  , z: 0 })
            gsap.to(img_logo_plane.position, { duration: 1, delay: 0, x: -260 })
            gsap.to(img_logo_back.position, { duration: 1, delay: 0, x: -260 })
            gsap.to(txtNeedYou.position, { duration: 1, delay: 0, x: -1100 })
            gsap.to(txtHowGreat.position, { duration: 1, delay: 0, x: 1100 })
            gsap.to(txtUpToYou.position, { duration: 1, delay: 0, x: -250, y: 20, z: 0 })
            gsap.to(txtUpToYou.rotation, { duration: 1, delay: 0, y: Math.PI * -1.9 })
            logoMove1 = false
          }
          setInterval(() => {
            animated = false
          }, 1500);
        }
      });
      //tick function-------------------------------TIC-----------------------TAC
      const clock = new THREE.Clock();
      let last = 0; // timestamp of the last render() call
      const tick = () => {
        //  controls.update();
        const elapsedTime = clock.getElapsedTime();
        img_logo_plane.rotateY(0.01);
        img_logo_back.rotateY(0.01);
        if (txtUpToYou != undefined) {
          // txtUpToYou.rotateY(Math.cos(elapsedTime) * 0.001);
          txtUpToYou.position.z = Math.sin(elapsedTime / 4) * -5
          txtUpToYou.position.y = Math.abs(4 * Math.sin(elapsedTime / 4 * 3)) +25
        }
        renderer.render(scene, camera);
        window.requestAnimationFrame(tick);
      }
      tick();
    }
  }
}
</script>
<style scoped>
#container{
  width: 100%;
}
</style>