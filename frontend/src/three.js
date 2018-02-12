import React, { Component } from 'react';
import * as THREE from 'three';

class AnimThree extends Component {
    constructor(props) {
        super(props);
        this.state = {
            width: null,
            height: null,
            start: false,
            y: false,
            z: true,
        }

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
    }

    componentDidMount() {
        const width = window.innerWidth;
        const height = width / 6;

        this.setState({
            width: width,
            height: height,
        });

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const geometry = new THREE.BoxGeometry(1, 1, 1)
        //const material = new THREE.MeshBasicMaterial({ color: 0xff00ff })

        const texture = new THREE.TextureLoader().load('https://upload.wikimedia.org/wikipedia/commons/7/73/Javascript-736400_960_720.png');

        const cubeMaterials = [ 
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
            new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide }),
        ];
        

        const material = new THREE.MeshFaceMaterial( cubeMaterials );
        const cube = new THREE.Mesh(geometry, material);

        renderer.setClearColor('#000000');
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize(width, height);

        camera.position.z = 10;

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.cube = cube;

        this.scene.add(cube);
        window.addEventListener( 'resize', this.onWindowResize, false );
        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement)
    }

    onWindowResize() {

        this.setState({ 
            width: window.innerWidth,
            height: window.innerWidth / 6,
        })
        this.camera.aspect = this.state.width / this.state.height; // todo
        this.camera.updateProjectionMatrix();
        this.renderer.setSize( this.state.width, this.state.height );
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    animate() {
        if (this.camera.position.z >= 1.76) {
            this.cube.rotation.x += 0.15;
            this.camera.position.z -= 0.099;
        }

        setInterval(() => {
            this.setState({ start: true })
        }, 2500)
        if (this.state.start && !this.state.y) {
            if (this.cube.rotation.y >= 0.9) this.setState({ y: true });
            this.cube.rotation.y += 0.01;
        }

        if (this.state.y && this.state.start) {
            if (this.cube.rotation.y <= -0.9) this.setState({ y: false })
            this.cube.rotation.y -= 0.01;
        }

        if (this.state.z && this.state.start) {
            if (this.cube.position.z >= 0.4) this.setState({ z: false });
            this.cube.position.z += 0.01;
        }

        if (!this.state.z && this.state.start) {
            if (this.cube.position.z <= -1.3) this.setState({ z: true });
            this.cube.position.z -= 0.01;
        }
        
        
        

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
    }


    render() {
        return (
            <div 
                style={ {width: this.state.width, height: this.state.height} } 
                ref={ (mount) => this.mount = mount }
            />
        )
    }
}

export default AnimThree;