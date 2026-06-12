import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const Peta3D = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xdddddd);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 50000);
        camera.position.set(0, 30, 60);

        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.target.set(100, 10, -250); 
        controls.enablePan = true; 
        controls.maxPolarAngle = Math.PI / 2 - 0.05; 

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(20, 40, 20);
        scene.add(directionalLight);

        const loader = new GLTFLoader();
        loader.load('http://127.0.0.1:5000/models/Kampus_Unhasss.glb', function(gltf) {
            scene.add(gltf.scene);
            console.log("✅ MODEL BERHASIL MASUK SCENE!");
        }, undefined, function(error) {
            console.error("❌ Gagal load .glb dari Flask: ", error);
        });

        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('http://127.0.0.1:5000/images/Kampus Unhas.jpg', function(texture) {
            texture.wrapS = THREE.ClampToEdgeWrapping;
            texture.wrapT = THREE.ClampToEdgeWrapping;
            texture.repeat.set(1.0, 0.97);
            texture.offset.set(0.0, 0.0);

            const lantaiGeo = new THREE.PlaneGeometry(5000, 5000); 
            const lantaiMat = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
            const basemapLantai = new THREE.Mesh(lantaiGeo, lantaiMat);

            basemapLantai.rotation.x = -Math.PI / 2; 
            basemapLantai.position.set(15, -2, 10); 

            scene.add(basemapLantai);
            console.log("🌍 Basemap dari Flask berhasil dipasang!"); 
        });

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event) => {

            if (event.target.closest('#popup-informasi')) return;

            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length > 0) {
                let objekDiklik = intersects[0].object;
                let kodeGedung3D = objekDiklik.name; 

                console.log("🎯 RAYCAST MENGENAI:", kodeGedung3D);

            fetch('http://127.0.0.1:5000/api/geojson')
                .then(response => response.json())
                .then(geojson => {

                    if (!kodeGedung3D || kodeGedung3D.trim() === "") return;

                    const dataDitemukan = geojson.features.find(feature => {
                        if (!feature.properties || !feature.properties.kode_id) return false;

                        const kodeDiGeojson = feature.properties.kode_id;

                        if (Array.isArray(kodeDiGeojson)) {
                            return kodeDiGeojson.includes(kodeGedung3D);
                        }

                        return kodeDiGeojson === kodeGedung3D;
                    });

                    const popup = document.getElementById('popup-informasi');
                    if (!popup) return;

                    if (dataDitemukan) {
                        const props = dataDitemukan.properties;
                        console.log("🎉 DATA SUKSES COCOK DI GEOJSON!", props);

                        document.getElementById('info-nama').innerText = props.BANGUNAN;
                        document.getElementById('info-deskripsi').innerText = 
                            `Fakultas/Gedung: ${props.KODE || '-'}\nLuas Wilayah: ${props.Luas_m2 || '-'} m²\nLokasi: ${props.LOKASI || 'Kampus Unhas Tamalanrea'}`;

                        const fotoElem = document.getElementById('info-foto');
                        if (props.FOTO && props.FOTO.trim() !== "") {
                            fotoElem.src = `http://127.0.0.1:5000/images/${props.FOTO}`;
                            fotoElem.style.display = "block"; 
                        } else {
                            fotoElem.style.display = "none";  
                        }
                    } else {

                        console.log(`💡 Gedung '${kodeGedung3D}' belum ada di GeoJSON, menampilkan pop-up default.`);

                        document.getElementById('info-nama').innerText = `Gedung Unhas (${kodeGedung3D})`;
                        document.getElementById('info-deskripsi').innerText = 
                            `Status Data: Belum Di-update di Database\nKode Model 3D: ${kodeGedung3D}\nLokasi: Kampus Unhas Tamalanrea`;

                        const fotoElem = document.getElementById('info-foto');
                        if (fotoElem) {
                            fotoElem.style.display = "none";
                        }
                    }

                    popup.classList.remove('hidden');
                })
                .catch(err => console.error("Gagal fetch data GeoJSON:", err));
            }
        };

        window.addEventListener('click', onMouseClick, false);

        let animationFrameId;
        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        };
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('click', onMouseClick);
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, []);

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>

            <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

            <div id="popup-informasi" className="hidden" style={{
                position: 'absolute', top: '20px', right: '20px', width: '320px',
                background: 'white', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', zIndex: 9999
            }}>
                <button id="btn-close" className="btn btn-sm btn-danger" style={{ position: 'absolute', top: '10px', right: '10px' }}
                    onClick={() => document.getElementById('popup-informasi').classList.add('hidden')}>✕</button>
                <img id="info-foto" src="" alt="Foto Gedung" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' }} />
                <h4 id="info-nama" style={{ margin: '0 0 10px 0', color: '#333' }}>Nama Gedung</h4>
                <p id="info-deskripsi" style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>Deskripsi...</p>
            </div>
        </div>
    );
};

export default Peta3D;