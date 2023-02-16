/* eslint-disable no-unused-vars */
import {
	BoxGeometry,
	SphereGeometry,
	BasicMaterial,
	LineMaterial,
	Mesh,
	Object3D,
	Vector3,
	Geometry,
	Buffer,
	Attribute,
} from "t3d";

import * as t3d from "t3d";

const colors = {
	PLAYER: 0xee836f,
	TARGET: 0xdccb18,
	PATH: 0x00a3af,
	WAYPOINT: 0x00a3af,
	CLAMPED_STEP: 0xdcd3b2,
	CLOSEST_NODE: 0x43676b,
};

const OFFSET = 0.2;

/**
 * Helper for debugging pathfinding behavior.
 */
class PathfindingHelper extends Object3D {

	constructor() {
		super();

		const playerMaterial = new BasicMaterial();
		playerMaterial.diffuse.setHex(colors.PLAYER);
		this._playerMarker = new Mesh(
			new SphereGeometry(0.25, 32, 32),
			playerMaterial
		);

		const targetMaterial = new BasicMaterial();
		targetMaterial.diffuse.setHex(colors.TARGET);
		this._targetMarker = new Mesh(
			new BoxGeometry(0.3, 0.3, 0.3),
			targetMaterial
		);

		const nodeMaterial = new BasicMaterial();
		nodeMaterial.diffuse.setHex(colors.CLOSEST_NODE);
		this._nodeMarker = new Mesh(new BoxGeometry(0.1, 0.8, 0.1), nodeMaterial);

		const stepMaterial = new BasicMaterial();
		stepMaterial.diffuse.setHex(colors.CLAMPED_STEP);
		this._stepMarker = new Mesh(new BoxGeometry(0.1, 1, 0.1), stepMaterial);

		this._pathMarker = new Object3D();

		this._pathLineMaterial = new LineMaterial();
		this._pathLineMaterial.diffuse.setHex(colors.PATH);
		this._pathLineMaterial.lineWidth = 1;

		this._pathPointMaterial = new BasicMaterial();
		this._pathPointMaterial.diffuse.setHex(colors.WAYPOINT);
		this._pathPointGeometry = new SphereGeometry(0.08);

		this._markers = [
			this._playerMarker,
			this._targetMarker,
			this._nodeMarker,
			this._stepMarker,
			this._pathMarker,
		];

		this._markers.forEach((marker) => {
			marker.visible = false;

			this.add(marker);
		});
	}

	/**
	 * @param {Array<Vector3>} path
	 * @return {this}
	 */
	setPath(path) {
		while (this._pathMarker.children.length) {
			this._pathMarker.children[0].visible = false;
			this._pathMarker.remove(this._pathMarker.children[0]);
		}

		path = [this._playerMarker.position].concat(path);

		// Draw debug lines
		const geometry = new Geometry();
		const buffer = new Buffer(new Float32Array(path.length * 3), 3);
		geometry.addAttribute("a_Position", new Attribute(buffer, 3, 0));
		for (let i = 0; i < path.length; i++) {
			geometry.attributes.a_Position.setXYZ(
				i,
				path[i].x,
				path[i].y + OFFSET,
				path[i].z
			);
		}
		// geometry.setIndex(new Attribute(new Buffer(new Uint16Array([]), 1)));
		this._pathMarker.add(new Mesh(geometry, this._pathLineMaterial));

		for (let i = 0; i < path.length - 1; i++) {
			const node = new Mesh(this._pathPointGeometry, this._pathPointMaterial);
			node.position.copy(path[i]);
			node.position.y += OFFSET;
			this._pathMarker.add(node);
		}

		this._pathMarker.visible = true;
		return this;
	}

	/**
	 * @param {Vector3} position
	 * @return {this}
	 */
	setPlayerPosition(position) {
		this._playerMarker.position.copy(position);
		this._playerMarker.visible = true;
		return this;
	}

	/**
	 * @param {Vector3} position
	 * @return {this}
	 */
	setTargetPosition(position) {
		this._targetMarker.position.copy(position);
		this._targetMarker.visible = true;
		return this;
	}

	/**
	 * @param {Vector3} position
	 * @return {this}
	 */
	setNodePosition(position) {
		this._nodeMarker.position.copy(position);
		this._nodeMarker.visible = true;
		return this;
	}

	/**
	 * @param {Vector3} position
	 * @return {this}
	 */
	setStepPosition(position) {
		this._stepMarker.position.copy(position);
		this._stepMarker.visible = true;
		return this;
	}

	/**
	 * Hides all markers.
	 * @return {this}
	 */
	reset() {
		while (this._pathMarker.children.length) {
			this._pathMarker.children[0].visible = false;
			this._pathMarker.remove(this._pathMarker.children[0]);
		}

		this._markers.forEach((marker) => {
			marker.visible = false;
		});

		return this;
	}
}

export { PathfindingHelper };
