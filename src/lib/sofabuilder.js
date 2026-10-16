// Build a luxurious FOAM sofa (brown velvet + thick cream plush cushions)
// Same style as client's real sofas in photos
export function buildSofa(THREE, isDark = false) {
    const group = new THREE.Group();

    // ===== LUXURIOUS FOAM PALETTE =====
    const P = isDark
        ? {
            bv: 0x3a2014, // warm brown velvet
            bd: 0x2a1608, // brown deep
            bh: 0x4a2818, // brown highlight
            cp: 0xdad0b8, // cream plush
            ch: 0xf0e6d0, // cream highlight
            ct: 0xd0c4a8, // cream tuft
            cv: 0xc8bca0, // cushion velvet edge
            g: 0xe6c98a, // gold
            gd: 0xc8a464, // gold deep
            w: 0x1a0e04, // dark wood
        }
        : {
            bv: 0x5a3a24, // warm brown velvet
            bd: 0x3a2010, // brown deep
            bh: 0x6a4428, // brown highlight
            cp: 0xe8dcc0, // cream plush
            ch: 0xf5ebd6, // cream highlight
            ct: 0xd8c8a8, // cream tuft
            cv: 0xd0c0a4, // cushion velvet edge
            g: 0xc8a464, // gold
            gd: 0xa37b34, // gold deep
            w: 0x2a1808, // dark wood
        };

    const mk = (c, r, m, e) =>
        new THREE.MeshStandardMaterial({
            color: c,
            roughness: r,
            metalness: m,
            emissive: e || 0,
            emissiveIntensity: e ? 0.15 : 0,
        });

    const bv = mk(P.bv, 0.65, 0.12); // brown velvet — soft sheen
    const bd = mk(P.bd, 0.7, 0.1); // brown deep
    const bh = mk(P.bh, 0.6, 0.14); // brown highlight
    const cp = mk(P.cp, 0.95, 0.01); // cream plush — matte
    const ch = mk(P.ch, 0.92, 0.02); // cream highlight — soft sheen
    const ct = mk(P.ct, 0.9, 0.02); // cream tuft
    const cv = mk(P.cv, 0.93, 0.01); // cushion velvet edge
    const gold = mk(P.g, 0.18, 0.98, P.gd); // gold trim
    const wood = mk(P.w, 0.35, 0.42); // wood legs

    const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);

    const add = (geo, m, x, y, z, rx, ry, rz) => {
        const o = new THREE.Mesh(geo, m);
        o.position.set(x, y, z);
        o.rotation.set(rx || 0, ry || 0, rz || 0);
        o.castShadow = true;
        o.receiveShadow = true;
        group.add(o);
        return o;
    };

    // ==================== SEAT BASE ====================
    // Wider, taller seat base for luxurious look
    add(B(3.6, 0.75, 1.75), bv, 0, 0.75, 0);

    // Gold piping top and bottom
    add(B(3.63, 0.03, 1.78), gold, 0, 1.14, 0);
    add(B(3.63, 0.025, 1.78), gold, 0, 0.4, 0);

    // ==================== BACKREST ====================
    add(B(3.6, 1.55, 0.48), bv, 0, 1.72, -0.68);
    add(B(3.63, 0.03, 0.5), gold, 0, 2.5, -0.68);

    // ==================== BACK CUSHIONS (tufted, thick) ====================
    [-1, 1].forEach((s) => {
        // Thick tufted back panel
        add(B(1.7, 1.35, 0.38), ct, s * 0.9, 1.68, -0.38);

        // Highlight layer for plush look
        add(B(1.65, 0.06, 0.34), ch, s * 0.9, 1.68, -0.36);

        // Gold outline top
        add(B(1.72, 0.03, 0.4), gold, s * 0.9, 2.38, -0.38);

        // Tufted diamond buttons — 3x3 grid pattern
        const btnGeo = new THREE.SphereGeometry(0.05, 12, 10);
        for (let tx = -1; tx <= 1; tx++) {
            for (let ty = -1; ty <= 1; ty++) {
                // Only place at corners + center (diamond pattern)
                if ((Math.abs(tx) + Math.abs(ty)) % 2 === 1) continue;
                add(
                    btnGeo,
                    bv,
                    s * 0.9 + tx * 0.42,
                    1.68 + ty * 0.42,
                    -0.19
                );
            }
        }

        // ==================== ARMS (rolled, thick) ====================
        add(B(0.42, 1.5, 1.75), bd, s * 2, 1.47, 0);

        // Rolled arm top
        const roll = add(
            new THREE.CylinderGeometry(0.26, 0.26, 1.77, 20),
            bd,
            s * 2,
            2.22,
            0
        );
        roll.rotation.set(Math.PI / 2, 0, 0);

        // Gold piping on arms
        add(B(0.44, 0.03, 1.77), gold, s * 2, 1.85, 0);

        // ==================== SEAT CUSHIONS (THICK FOAM) ====================
        // Main cushion — thick
        add(B(1.7, 0.55, 1.55), cp, s * 0.88, 1.35, 0.08);

        // Top highlight (plush)
        add(B(1.62, 0.06, 1.47), ch, s * 0.88, 1.66, 0.08);

        // Front gusset (shows foam thickness)
        add(B(1.7, 0.16, 0.06), cv, s * 0.88, 1.16, 0.86);

        // Back gusset
        add(B(1.7, 0.16, 0.06), cv, s * 0.88, 1.16, -0.7);

        // Side gussets (left/right of each cushion)
        add(B(0.05, 0.16, 1.55), cv, s * 0.88 - 0.86, 1.16, 0.08);
        add(B(0.05, 0.16, 1.55), cv, s * 0.88 + 0.86, 1.16, 0.08);

        // ==================== THROW PILLOWS (cream, tufted) ====================
        const pillow = add(
            B(0.78, 0.78, 0.28),
            ch,
            s * 1.08,
            1.75,
            -0.14,
            -0.1,
            0,
            s * 0.2
        );

        // Center tuft button on pillow
        add(
            new THREE.SphereGeometry(0.055, 12, 10),
            bv,
            s * 1.08,
            1.75,
            0.02
        );
    });

    // ==================== LEGS (Sheesham wood with gold rings) ====================
    [-1, 1].forEach((sx) =>
        [-1, 1].forEach((sz) => {
            const x = sx * 1.68;
            const z = sz * 0.75;

            // Top mount
            add(B(0.16, 0.09, 0.16), wood, x, 0.36, z);

            // Tapered body
            add(
                new THREE.CylinderGeometry(0.06, 0.09, 0.36, 16),
                wood,
                x,
                0.17,
                z
            );

            // Gold ring at base
            add(
                new THREE.CylinderGeometry(0.07, 0.07, 0.025, 16),
                gold,
                x,
                0.02,
                z
            );

            // Gold cap at top
            add(
                new THREE.CylinderGeometry(0.06, 0.06, 0.018, 16),
                gold,
                x,
                0.31,
                z
            );
        })
    );

    return group;
}

// Dispose helper
export function disposeSofa(group) {
    if (!group) return;
    group.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach((m) => m.dispose());
            } else {
                obj.material.dispose();
            }
        }
    });
}