// Circular 3D Diagram with Three.js
class Circular3DDiagram {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true, 
            antialias: true 
        });
        
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.intersectedObject = null;
        
        this.init();
        this.createCircularDiagram();
        this.setupLighting();
        this.setupEventListeners();
        this.animate();
    }

    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000000, 0);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        // Add to hero background
        const heroBackground = document.querySelector('.hero-bg');
        const canvasContainer = document.createElement('div');
        canvasContainer.className = 'circular-3d-container';
        canvasContainer.appendChild(this.renderer.domElement);
        heroBackground.appendChild(canvasContainer);
        
        // Position camera
        this.camera.position.set(0, 5, 15);
        this.camera.lookAt(0, 0, 0);
    }

    createCircularDiagram() {
        this.diagramGroup = new THREE.Group();
        
        // Tech stack data
        const techData = [
            { name: 'HTML5', color: 0xe34f26, icon: '⚡' },
            { name: 'CSS3', color: 0x1572b6, icon: '🎨' },
            { name: 'JavaScript', color: 0xf7df1e, icon: '⚡' },
            { name: 'React', color: 0x61dafb, icon: '⚛️' },
            { name: 'Node.js', color: 0x339933, icon: '🚀' },
            { name: 'MongoDB', color: 0x47a248, icon: '🗄️' },
            { name: 'Express.js', color: 0x000000, icon: '🔧' },
            { name: 'Git', color: 0xf05032, icon: '📋' }
        ];

        const radius = 8;
        const centerRadius = 2;
        
        // Create center core
        this.createCenterCore();
        
        // Create tech nodes in circle
        techData.forEach((tech, index) => {
            const angle = (index / techData.length) * Math.PI * 2;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            this.createTechNode(tech, x, 0, z, index);
        });
        
        // Create connecting elements
        this.createConnections(techData.length, radius);
        
        // Create orbital rings
        this.createOrbitalRings();
        
        this.scene.add(this.diagramGroup);
    }

    createCenterCore() {
        // Main center sphere
        const coreGeometry = new THREE.SphereGeometry(1.5, 32, 32);
        const coreMaterial = new THREE.MeshPhongMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.8,
            shininess: 100
        });
        
        this.centerCore = new THREE.Mesh(coreGeometry, coreMaterial);
        this.centerCore.castShadow = true;
        this.centerCore.receiveShadow = true;
        
        // Add pulsing animation data
        this.centerCore.userData = {
            originalScale: 1,
            pulseSpeed: 0.02
        };
        
        this.diagramGroup.add(this.centerCore);
        
        // Add inner energy rings
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(2 + i * 0.5, 0.1, 8, 32);
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: [0x667eea, 0x764ba2, 0x4facfe][i],
                transparent: true,
                opacity: 0.4
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.userData = {
                rotationSpeed: 0.01 + i * 0.005,
                axis: ['x', 'y', 'z'][i]
            };
            
            this.diagramGroup.add(ring);
        }
    }

    createTechNode(tech, x, y, z, index) {
        const nodeGroup = new THREE.Group();
        
        // Main node sphere
        const nodeGeometry = new THREE.SphereGeometry(0.8, 16, 16);
        const nodeMaterial = new THREE.MeshPhongMaterial({
            color: tech.color,
            transparent: true,
            opacity: 0.9,
            shininess: 100
        });
        
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        node.castShadow = true;
        node.receiveShadow = true;
        
        // Add floating animation
        node.userData = {
            originalY: y,
            floatSpeed: 0.02 + Math.random() * 0.01,
            floatAmplitude: 0.5,
            tech: tech,
            originalColor: tech.color
        };
        
        nodeGroup.add(node);
        
        // Create connecting beam to center
        const beamGeometry = new THREE.CylinderGeometry(0.05, 0.05, 8, 8);
        const beamMaterial = new THREE.MeshPhongMaterial({
            color: tech.color,
            transparent: true,
            opacity: 0.3,
            emissive: tech.color,
            emissiveIntensity: 0.1
        });
        
        const beam = new THREE.Mesh(beamGeometry, beamMaterial);
        beam.position.set(x / 2, y, z / 2);
        beam.lookAt(0, y, 0);
        beam.rotateX(Math.PI / 2);
        
        this.diagramGroup.add(beam);
        
        // Position node
        nodeGroup.position.set(x, y, z);
        
        // Add to diagram
        this.diagramGroup.add(nodeGroup);
        
        // Store reference for interaction
        node.userData.nodeGroup = nodeGroup;
        node.userData.beam = beam;
    }

    createConnections(nodeCount, radius) {
        // Create connecting lines between adjacent nodes
        for (let i = 0; i < nodeCount; i++) {
            const nextIndex = (i + 1) % nodeCount;
            
            const angle1 = (i / nodeCount) * Math.PI * 2;
            const angle2 = (nextIndex / nodeCount) * Math.PI * 2;
            
            const x1 = Math.cos(angle1) * radius;
            const z1 = Math.sin(angle1) * radius;
            const x2 = Math.cos(angle2) * radius;
            const z2 = Math.sin(angle2) * radius;
            
            const points = [
                new THREE.Vector3(x1, 0, z1),
                new THREE.Vector3(x2, 0, z2)
            ];
            
            const geometry = new THREE.BufferGeometry().setFromPoints(points);
            const material = new THREE.LineBasicMaterial({
                color: 0x667eea,
                transparent: true,
                opacity: 0.3
            });
            
            const line = new THREE.Line(geometry, material);
            this.diagramGroup.add(line);
        }
    }

    createOrbitalRings() {
        // Create large orbital rings
        for (let i = 0; i < 2; i++) {
            const ringGeometry = new THREE.TorusGeometry(12 + i * 2, 0.2, 8, 64);
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: [0x667eea, 0x764ba2][i],
                transparent: true,
                opacity: 0.2,
                wireframe: true
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2 + (i * Math.PI / 6);
            ring.userData = {
                rotationSpeed: 0.005 + i * 0.002
            };
            
            this.diagramGroup.add(ring);
        }
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Main directional light
        const directionalLight = new THREE.DirectionalLight(0x667eea, 1);
        directionalLight.position.set(10, 10, 5);
        directionalLight.castShadow = true;
        directionalLight.shadow.mapSize.width = 2048;
        directionalLight.shadow.mapSize.height = 2048;
        this.scene.add(directionalLight);

        // Point lights for accent
        const pointLight1 = new THREE.PointLight(0x764ba2, 0.8, 50);
        pointLight1.position.set(-15, 5, 10);
        this.scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x4facfe, 0.6, 50);
        pointLight2.position.set(15, -5, -10);
        this.scene.add(pointLight2);
    }

    setupEventListeners() {
        // Mouse move for interaction
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Click interaction
        window.addEventListener('click', (event) => {
            this.handleClick(event);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    handleClick(event) {
        this.raycaster.setFromCamera(this.mouse, this.camera);
        
        const intersects = this.raycaster.intersectObjects(this.diagramGroup.children, true);
        
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.tech) {
                this.highlightTech(object);
            }
        }
    }

    highlightTech(techNode) {
        // Reset all nodes
        this.diagramGroup.children.forEach(child => {
            if (child.userData && child.userData.tech) {
                child.material.emissive.setHex(0x000000);
                child.material.opacity = 0.9;
            }
        });
        
        // Highlight selected node
        techNode.material.emissive.setHex(techNode.userData.originalColor);
        techNode.material.emissiveIntensity = 0.3;
        techNode.material.opacity = 1;
        
        // Create ripple effect
        this.createRippleEffect(techNode.position);
    }

    createRippleEffect(position) {
        const rippleGeometry = new THREE.RingGeometry(1, 2, 32);
        const rippleMaterial = new THREE.MeshBasicMaterial({
            color: 0x667eea,
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide
        });
        
        const ripple = new THREE.Mesh(rippleGeometry, rippleMaterial);
        ripple.position.copy(position);
        ripple.lookAt(this.camera.position);
        
        this.scene.add(ripple);
        
        // Animate ripple
        const startTime = Date.now();
        const animateRipple = () => {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / 1000; // 1 second animation
            
            if (progress < 1) {
                ripple.scale.setScalar(1 + progress * 3);
                ripple.material.opacity = 0.5 * (1 - progress);
                requestAnimationFrame(animateRipple);
            } else {
                this.scene.remove(ripple);
            }
        };
        
        animateRipple();
    }

    handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Rotate entire diagram slowly
        this.diagramGroup.rotation.y += 0.005;
        
        // Camera orbital movement
        const time = Date.now() * 0.0005;
        this.camera.position.x = Math.cos(time) * 20;
        this.camera.position.z = Math.sin(time) * 20;
        this.camera.lookAt(0, 0, 0);
        
        // Animate individual elements
        this.diagramGroup.children.forEach((child, index) => {
            if (child.userData.floatSpeed) {
                // Floating animation for tech nodes
                child.position.y = child.userData.originalY + 
                    Math.sin(Date.now() * child.userData.floatSpeed + index) * 
                    child.userData.floatAmplitude;
            }
            
            if (child.userData.rotationSpeed) {
                // Rotation for rings
                if (child.userData.axis === 'y') {
                    child.rotation.y += child.userData.rotationSpeed;
                } else {
                    child.rotation.x += child.userData.rotationSpeed;
                }
            }
            
            if (child.userData.pulseSpeed) {
                // Pulsing animation for center core
                const scale = 1 + Math.sin(Date.now() * child.userData.pulseSpeed) * 0.1;
                child.scale.setScalar(scale);
            }
        });
        
        // Mouse interaction with camera
        this.camera.position.x += (this.mouse.x * 5 - this.camera.position.x) * 0.01;
        this.camera.position.y += (-this.mouse.y * 5 - this.camera.position.y) * 0.01;
        
        // Raycasting for hover effects
        this.raycaster.setFromCamera(this.mouse, this.camera);
        const intersects = this.raycaster.intersectObjects(this.diagramGroup.children, true);
        
        // Reset previous intersection
        if (this.intersectedObject) {
            if (this.intersectedObject.userData.tech) {
                this.intersectedObject.material.emissive.setHex(0x000000);
                this.intersectedObject.scale.setScalar(1);
            }
        }
        
        // Handle new intersection
        if (intersects.length > 0) {
            const object = intersects[0].object;
            if (object.userData.tech && object !== this.intersectedObject) {
                object.material.emissive.setHex(0x667eea);
                object.material.emissiveIntensity = 0.2;
                object.scale.setScalar(1.2);
                this.intersectedObject = object;
            }
        } else {
            this.intersectedObject = null;
        }
        
        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Wait for Three.js to load
    if (typeof THREE !== 'undefined') {
        new Circular3DDiagram();
    } else {
        console.error('Three.js not loaded');
    }
});