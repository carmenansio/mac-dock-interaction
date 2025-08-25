// Tiny, smooth magnification using a Gaussian curve and CSS custom properties
const dock = document.getElementById("dock");
const items = Array.from(dock.querySelectorAll(".dock-item"));

const css = getComputedStyle(document.documentElement);
const maxScale = parseFloat(css.getPropertyValue("--max-scale")) || 2.4;

let sigma = parseFloat(css.getPropertyValue("--sigma")) || 90; // px
let hitbox = parseFloat(css.getPropertyValue("--hitbox")) || 130; // px

// Cache unscaled centers; they don't change with transform-origin at bottom
let centers = [];
let dockBox = null;

function measure() {
	dockBox = dock.getBoundingClientRect();
	centers = items.map((el) => {
		const r = el.getBoundingClientRect();
		return r.left + r.width / 2;
	});
}

measure();
new ResizeObserver(measure).observe(dock);
window.addEventListener("resize", measure, { passive: true });

let pointerX = 0,
	pointerY = 0,
	active = false,
	raf = 0;

function gaussian(distance) {
	// Gaussian bump centered at each item: exp(-d^2 / (2sigma^2))
	const s2 = 2 * sigma * sigma;
	return Math.exp(-(distance * distance) / s2);
}

function animate() {
	raf = 0;
	const withinY =
		pointerY > dockBox.top - hitbox && pointerY < dockBox.bottom + 40;
	const targetActive = withinY;

	for (const [i, el] of items.entries()) {
		const dx = Math.abs(pointerX - centers[i]);
		const influence = targetActive ? gaussian(dx) : 0;
		const target = 1 + (maxScale - 1) * influence;
		// Smoothly approach the target scale using a light lerp
		const current = el._scale ?? 1;
		const next = current + (target - current) * 0.25; // smoothing factor
		el._scale = next;
		el.style.setProperty("--scale", next.toFixed(3));
		el.style.setProperty("--max-scale", maxScale);
		el.style.zIndex = String(100 + Math.round(next * 100));
	}

	// Keep animating while any item is still transitioning toward its target
	const stillMoving =
		items.some((el) => Math.abs((el._scale ?? 1) - 1) > 0.003) || targetActive;
	if (stillMoving) {
		raf = requestAnimationFrame(animate);
	}
}

function schedule() {
	if (!raf) {
		raf = requestAnimationFrame(animate);
	}
}

function onPointerMove(e) {
	pointerX = e.clientX;
	pointerY = e.clientY;
	schedule();
}

// Prefer pointer events, gracefully fallback
window.addEventListener("pointermove", onPointerMove, { passive: true });

// Touch: let finger control magnification; reset on end
window.addEventListener("pointerdown", onPointerMove, { passive: true });
window.addEventListener(
	"pointerup",
	() => {
		pointerY = -9999;
		schedule();
	},
	{ passive: true }
);
window.addEventListener(
	"mouseleave",
	() => {
		pointerY = -9999;
		schedule();
	},
	{ passive: true }
);

// Live-update tokens if you tweak them in DevTools / CodePen
const ro = new ResizeObserver(() => {
	const cs = getComputedStyle(document.documentElement);
	sigma = parseFloat(cs.getPropertyValue("--sigma")) || sigma;
	hitbox = parseFloat(cs.getPropertyValue("--hitbox")) || hitbox;
});
ro.observe(document.documentElement);

// Accessibility: arrow-key focus traversal nudges scale for focused item
dock.addEventListener("keydown", (e) => {
	const focusIndex = items.indexOf(document.activeElement);
	if (focusIndex === -1) return;
	if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
		e.preventDefault();
		const dir = e.key === "ArrowRight" ? 1 : -1;
		const next = (focusIndex + dir + items.length) % items.length;
		items[next].focus();
	}
});