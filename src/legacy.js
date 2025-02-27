import { TEXEL_ENCODING_TYPE, PIXEL_FORMAT, PIXEL_TYPE, TEXTURE_FILTER, TEXTURE_WRAP, COMPARE_FUNC, OPERATION } from './const.js';
import { Fog } from './resources/fogs/Fog.js';
import { FogExp2 } from './resources/fogs/FogExp2.js';
import { TextureBase } from './resources/textures/TextureBase.js';
import { Texture2D } from './resources/textures/Texture2D.js';
import { Texture3D } from './resources/textures/Texture3D.js';
import { TextureCube } from './resources/textures/TextureCube.js';
import { Material } from './resources/materials/Material.js';
import { Vector3 } from './math/Vector3.js';
import { WebGLRenderPass } from './webgl/WebGLRenderPass.js';
import { WebGLVertexArrayBindings } from './webgl/WebGLVertexArrayBindings.js';
import { Camera } from './scenes/Camera.js';
import { Light } from './scenes/Light.js';
import { AmbientLight } from './scenes/lights/AmbientLight.js';
import { DirectionalLight } from './scenes/lights/DirectionalLight.js';
import { HemisphereLight } from './scenes/lights/HemisphereLight.js';
import { PointLight } from './scenes/lights/PointLight.js';
import { SpotLight } from './scenes/lights/SpotLight.js';
import { BoxGeometry } from './resources/geometries/BoxGeometry.js';
import { Mesh } from './scenes/Mesh.js';
import { SkinnedMesh } from './scenes/SkinnedMesh.js';
import { Scene } from './scenes/Scene.js';
import { Object3D } from './scenes/Object3D.js';
import { ImageLoader } from './loaders/ImageLoader.js';

export { PIXEL_FORMAT as WEBGL_PIXEL_FORMAT };
export { PIXEL_TYPE as WEBGL_PIXEL_TYPE };
export { TEXTURE_FILTER as WEBGL_TEXTURE_FILTER };
export { TEXTURE_WRAP as WEBGL_TEXTURE_WRAP };
export { COMPARE_FUNC as WEBGL_COMPARE_FUNC };
export { OPERATION as WEBGL_OP };

export { BoxGeometry as CubeGeometry };

export class Group extends Object3D {

	constructor() {
		super();
		// console.warn("Group has been removed, use Object3D instead.");
	}

}

Group.prototype.isGroup = true;

export class EnvironmentMapPass {

	constructor() {
		console.error("EnvironmentMapPass has been removed, use ReflectionProbe(jsm) instead.");
	}

}

Vector3.prototype.applyProjection = function(_m) {
	console.error("t3d.Vector3: .applyProjection has been removed. Use .applyMatrix4 instead.");
}

Object.defineProperties(Camera.prototype, {
	gammaInput: {
		get: function() {
			console.warn("t3d.Camera: .gammaInput has been removed. Use texture.encoding instead.");
			return false;
		},
		set: function(_value) {
			console.warn("t3d.Camera: .gammaInput has been removed. Use texture.encoding instead.");
		}
	},
	gammaOutput: {
		get: function() {
			console.warn("t3d.Camera: .gammaOutput has been removed. Use .outputEncoding or renderTarget.texture.encoding instead.");
			return this.outputEncoding == TEXEL_ENCODING_TYPE.GAMMA;
		},
		set: function(value) {
			console.warn("t3d.Camera: .gammaOutput has been removed. Use .outputEncoding or renderTarget.texture.encoding instead.");
			if (value) {
				this.outputEncoding = TEXEL_ENCODING_TYPE.GAMMA;
			} else {
				this.outputEncoding = TEXEL_ENCODING_TYPE.LINEAR;
			}
		}
	}
});

Object.defineProperties(Material.prototype, {
	emissiveIntensity: {
		get: function() {
			console.warn("t3d.Material: .emissiveIntensity has been removed. Use material.emissive instead.");
			return false;
		},
		set: function(_value) {
			console.warn("t3d.Material: .emissiveIntensity has been removed. Use material.emissive instead.");
		}
	}
});

Object.defineProperties(WebGLRenderPass.prototype, {
	textures: {
		get: function() {
			console.warn("WebGLRenderPass: .textures has been deprecated. All methods are moved to WebGLRenderPass.");
			return this._textures;
		}
	},
	renderBuffers: {
		get: function() {
			console.warn("WebGLRenderPass: .renderBuffers has been deprecated. All methods are moved to WebGLRenderPass.");
			return this._renderBuffers;
		}
	},
	renderTarget: {
		get: function() {
			// console.warn("WebGLRenderPass: .renderTarget has been deprecated. All methods are moved to WebGLRenderPass.");
			return this._renderTargets;
		}
	},
	state: {
		get: function() {
			// console.warn("WebGLRenderPass: .state has been deprecated. All methods are moved to WebGLRenderPass.");
			return this._state;
		}
	},
	vertexArrayBindings: {
		get: function() {
			console.warn("WebGLRenderPass: .vertexArrayBindings has been deprecated. All methods are moved to WebGLRenderPass.");
			return this._vertexArrayBindings;
		}
	}
});

WebGLVertexArrayBindings.prototype.resetBinding = function() {
	console.error("WebGLVertexArrayBindings: .resetBinding() has been removed. Use WebGLRenderPass.resetVertexArrayBindings() instead.");
}

// Enum for WebGL Texture Type.
export const WEBGL_TEXTURE_TYPE = {
	TEXTURE_2D: 0x0DE1,
	TEXTURE_CUBE_MAP: 0x8513,
	/** Only webgl2 */
	TEXTURE_3D: 0x806F
};

Object.defineProperties(TextureBase.prototype, {
	textureType: {
		get: function() {
			console.warn("TextureBase: .textureType has been removed.");
			return "";
		},
		set: function(_value) {
			console.warn("TextureBase: .textureType has been removed.");
		}
	}
});

Object.defineProperties(Texture2D, {
	textureType: {
		get: function() {
			console.warn("Texture2D: .textureType has been removed.");
			return WEBGL_TEXTURE_TYPE.TEXTURE_2D;
		},
		set: function(_value) {
			console.warn("Texture2D: .textureType has been removed.");
		}
	}
});

Object.defineProperties(Texture3D, {
	textureType: {
		get: function() {
			console.warn("Texture3D: .textureType has been removed.");
			return WEBGL_TEXTURE_TYPE.TEXTURE_3D;
		},
		set: function(_value) {
			console.warn("Texture3D: .textureType has been removed.");
		}
	}
});

Object.defineProperties(TextureCube, {
	textureType: {
		get: function() {
			console.warn("TextureCube: .textureType has been removed.");
			return WEBGL_TEXTURE_TYPE.TEXTURE_CUBE_MAP;
		},
		set: function(_value) {
			console.warn("TextureCube: .textureType has been removed.");
		}
	}
});

// Enum for light Type.
export const LIGHT_TYPE = {
	AMBIENT: "ambient",
	HEMISPHERE: "hemisphere",
	DIRECT: "direct",
	POINT: "point",
	SPOT: "spot"
};

Object.defineProperties(Light.prototype, {
	lightType: {
		get: function() {
			console.warn("Light: .lightType has been removed.");
			return "";
		},
		set: function(_value) {
			console.warn("Light: .lightType has been removed.");
		}
	}
});


Object.defineProperties(AmbientLight.prototype, {
	lightType: {
		get: function() {
			console.warn("AmbientLight: .lightType has been removed.");
			return LIGHT_TYPE.AMBIENT;
		},
		set: function(_value) {
			console.warn("AmbientLight: .lightType has been removed.");
		}
	}
});

Object.defineProperties(DirectionalLight.prototype, {
	lightType: {
		get: function() {
			console.warn("DirectionalLight: .lightType has been removed.");
			return LIGHT_TYPE.DIRECT;
		},
		set: function(_value) {
			console.warn("DirectionalLight: .lightType has been removed.");
		}
	}
});


Object.defineProperties(HemisphereLight.prototype, {
	lightType: {
		get: function() {
			console.warn("HemisphereLight: .lightType has been removed.");
			return LIGHT_TYPE.HEMISPHERE;
		},
		set: function(_value) {
			console.warn("HemisphereLight: .lightType has been removed.");
		}
	}
});

Object.defineProperties(PointLight.prototype, {
	lightType: {
		get: function() {
			console.warn("PointLight: .lightType has been removed.");
			return LIGHT_TYPE.POINT;
		},
		set: function(_value) {
			console.warn("PointLight: .lightType has been removed.");
		}
	}
});

Object.defineProperties(SpotLight.prototype, {
	lightType: {
		get: function() {
			console.warn("SpotLight: .lightType has been removed.");
			return LIGHT_TYPE.SPOT;
		},
		set: function(_value) {
			console.warn("SpotLight: .lightType has been removed.");
		}
	}
});

// Enum for object Type.
export const OBJECT_TYPE = {
	MESH: "mesh",
	SKINNED_MESH: "skinned_mesh",
	LIGHT: "light",
	CAMERA: "camera",
	SCENE: "scene",
	GROUP: "group"
};

Object.defineProperties(Mesh.prototype, {
	type: {
		get: function() {
			console.warn("Mesh: .type has been removed, use .isMesh instead.");
			return OBJECT_TYPE.MESH;
		},
		set: function(_value) {
			console.warn("Mesh: .type has been removed.");
		}
	}
});

Object.defineProperties(SkinnedMesh.prototype, {
	type: {
		get: function() {
			console.warn("SkinnedMesh: .type has been removed, use .isSkinnedMesh instead.");
			return OBJECT_TYPE.SKINNED_MESH;
		},
		set: function(_value) {
			console.warn("SkinnedMesh: .type has been removed.");
		}
	}
});

Object.defineProperties(Light.prototype, {
	type: {
		get: function() {
			console.warn("Light: .type has been removed, use .isLight instead.");
			return OBJECT_TYPE.LIGHT;
		},
		set: function(_value) {
			console.warn("Light: .type has been removed.");
		}
	}
});

Object.defineProperties(Camera.prototype, {
	type: {
		get: function() {
			console.warn("Camera: .type has been removed, use .isCamera instead.");
			return OBJECT_TYPE.CAMERA;
		},
		set: function(_value) {
			console.warn("Camera: .type has been removed.");
		}
	}
});

Object.defineProperties(Scene.prototype, {
	type: {
		get: function() {
			console.warn("Scene: .type has been removed, use .isScene instead.");
			return OBJECT_TYPE.SCENE;
		},
		set: function(_value) {
			console.warn("Scene: .type has been removed.");
		}
	}
});

Object.defineProperties(Group.prototype, {
	type: {
		get: function() {
			console.warn("Group: .type has been removed, use .isGroup instead.");
			return OBJECT_TYPE.GROUP;
		},
		set: function(_value) {
			console.warn("Group: .type has been removed.");
		}
	}
});

// Enum for fog Type.
export const FOG_TYPE = {
	NORMAL: "normal",
	EXP2: "exp2"
};

Object.defineProperties(Fog.prototype, {
	fogType: {
		get: function() {
			console.warn("Fog: .fogType has been removed, use .isFog instead.");
			return FOG_TYPE.NORMAL;
		},
		set: function(_value) {
			console.warn("Fog: .fogType has been removed.");
		}
	}
});

Object.defineProperties(FogExp2.prototype, {
	fogType: {
		get: function() {
			console.warn("FogExp2: .fogType has been removed, use .isFogExp2 instead.");
			return FOG_TYPE.EXP2;
		},
		set: function(_value) {
			console.warn("FogExp2: .fogType has been removed.");
		}
	}
});

Texture2D.fromImage = function(image) {
	console.warn("Texture2D.fromImage has been removed.");

	const texture = new Texture2D();

	texture.image = image;
	texture.version++;

	return texture;
}

Texture2D.fromSrc = function(src) {
	console.warn("Texture2D.fromSrc has been removed, use Texture2DLoader(jsm) instead.");

	const texture = new Texture2D();

	const loader = new ImageLoader();

	loader.load(src, function(image) {
		texture.image = image;
		texture.version++;
		texture.dispatchEvent({ type: 'onload' });
	});

	return texture;
}

TextureCube.fromImage = function(imageArray) {
	console.warn("TextureCube.fromImage has been removed.");

	const texture = new TextureCube();
	const images = texture.images;

	for (let i = 0; i < 6; i++) {
		images[i] = imageArray[i];
	}

	texture.version++;

	return texture;
}

TextureCube.fromSrc = function(srcArray) {
	console.warn("TextureCube.fromSrc has been removed, use TextureCubeLoader(jsm) instead.");

	const texture = new TextureCube();
	const images = texture.images;

	const loader = new ImageLoader();

	let count = 0;
	function next(image) {
		if (image) {
			images.push(image);
			count++;
		}
		if (count >= 6) {
			loaded();
			return;
		}
		loader.load(srcArray[count], next);
	}
	next();

	function loaded() {
		texture.version++;
		texture.dispatchEvent({ type: 'onload' });
	}

	return texture;
}