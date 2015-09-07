var boxType = {
    scene: null,
    camera: null,
    renderer: null,
    container: null,
    controls: null,
    clock: null,
    stats: null,

    init: function() { // Initialization

        // create main scene
        this.scene = new THREE.Scene();

        var SCREEN_WIDTH = window.innerWidth,
            SCREEN_HEIGHT = window.innerHeight;

        // prepare camera
        var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 1, FAR = 1000;
        this.camera = new THREE.PerspectiveCamera( VIEW_ANGLE, ASPECT, NEAR, FAR);
        this.scene.add(this.camera);
        this.camera.position.set(0, 30, 150);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        // prepare renderer
        this.renderer = new THREE.WebGLRenderer({antialias:true, alpha: false});
        this.renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
        this.renderer.setClearColor(0xffffff);

        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;

        // prepare container
        this.container = document.createElement('div');
        document.body.appendChild(this.container);
        this.container.appendChild(this.renderer.domElement);

        // events
        THREEx.WindowResize(this.renderer, this.camera);

        // prepare controls (OrbitControls)
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.target = new THREE.Vector3(0, 0, 0);
        this.controls.maxDistance = 700;

        // prepare clock
        this.clock = new THREE.Clock();

        // prepare stats
        this.stats = new Stats();
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = '50px';
        this.stats.domElement.style.bottom = '50px';
        this.stats.domElement.style.zIndex = 1;
        this.container.appendChild( this.stats.domElement );

        // add point light
        var spLight = new THREE.PointLight(0xffffff, 1.75, 1000);
        spLight.position.set(-100, 200, 200);
        this.scene.add(spLight);

        // add simple cube
        var cube = new THREE.Mesh( new THREE.CubeGeometry(50, 10, 50), new THREE.MeshLambertMaterial({color:0xffffff * Math.random()}) );
        cube.position.set(0, 0, 0);
        //this.scene.add(cube);

        // add simple skybox
        this.drawSimpleSkybox();

        // add reflecting objects
    },
    drawSimpleSkybox: function() {
        // define path and box sides images
        var path = 'images/';
        var sides = [ path + 'NewSky_02.jpg', path + 'NewSky_04.jpg', path + 'NewSky_06.jpg', path + 'NewSky_05.jpg', path + 'NewSky_01.jpg', path + 'NewSky_03.jpg'];

        // load images
        var scCube = THREE.ImageUtils.loadTextureCube(sides);
        scCube.format = THREE.RGBFormat;

        // prepare skybox material (shader)
        var skyShader = THREE.ShaderLib["cube"];
        skyShader.uniforms["tCube"].value = scCube;
        var skyMaterial = new THREE.ShaderMaterial( {
          fragmentShader: skyShader.fragmentShader, vertexShader: skyShader.vertexShader,
          uniforms: skyShader.uniforms, depthWrite: false, side: THREE.BackSide
        });

        // create Mesh with cube geometry and add to the scene
        var skyBox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), skyMaterial);
        skyMaterial.needsUpdate = true;

        this.scene.add(skyBox);
    }
};


// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    render();
    update();
}

// Update controls and stats
function update() {
    boxType.controls.update(boxType.clock.getDelta());
    boxType.stats.update();
}

// Render the scene
function render() {
    if (boxType.renderer) {
        boxType.renderer.render(boxType.scene, boxType.camera);
    }
}

// Initialize lesson on page load
function initializeLesson() {
    boxType.init();
    animate();
}

if (window.addEventListener)
    window.addEventListener('load', initializeLesson, false);
else if (window.attachEvent)
    window.attachEvent('onload', initializeLesson);
else window.onload = initializeLesson;
