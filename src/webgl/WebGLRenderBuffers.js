class WebGLRenderBuffers {

	constructor(gl, properties, capabilities, constants) {
		this.gl = gl;
		this.properties = properties;
		this.capabilities = capabilities;
		this.constants = constants;

		function onRenderBufferDispose(event) {
			const renderBuffer = event.target;

			renderBuffer.removeEventListener('dispose', onRenderBufferDispose);

			const renderBufferProperties = properties.get(renderBuffer);

			if (renderBufferProperties.__webglRenderbuffer && !renderBufferProperties.__external) {
				gl.deleteRenderbuffer(renderBufferProperties.__webglRenderbuffer);
			}

			properties.delete(renderBuffer);
		}

		this._onRenderBufferDispose = onRenderBufferDispose;
	}

	setRenderBuffer(renderBuffer) {
		const gl = this.gl;
		const capabilities = this.capabilities;
		const constants = this.constants;

		const renderBufferProperties = this.properties.get(renderBuffer);

		if (renderBufferProperties.__webglRenderbuffer === undefined) {
			renderBuffer.addEventListener('dispose', this._onRenderBufferDispose);

			renderBufferProperties.__webglRenderbuffer = gl.createRenderbuffer();

			gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferProperties.__webglRenderbuffer);

			const glFormat = constants.getGLInternalFormat(renderBuffer.format);

			if (renderBuffer.multipleSampling > 0) {
				if (capabilities.version < 2) {
					console.error("render buffer multipleSampling is not support in webgl 1.0.");
				}
				gl.renderbufferStorageMultisample(gl.RENDERBUFFER, Math.min(renderBuffer.multipleSampling, capabilities.maxSamples), glFormat, renderBuffer.width, renderBuffer.height);
			} else {
				gl.renderbufferStorage(gl.RENDERBUFFER, glFormat, renderBuffer.width, renderBuffer.height);
			}
		} else {
			gl.bindRenderbuffer(gl.RENDERBUFFER, renderBufferProperties.__webglRenderbuffer);
		}

		return renderBufferProperties;
	}

	setRenderBufferExternal(renderBuffer, webglRenderbuffer) {
		const gl = this.gl;

		const renderBufferProperties = this.properties.get(renderBuffer);

		if (!renderBufferProperties.__external) {
			if (renderBufferProperties.__webglRenderbuffer) {
				gl.deleteRenderbuffer(renderBufferProperties.__webglRenderbuffer);
			} else {
				renderBuffer.addEventListener('dispose', this._onRenderBufferDispose);
			}
		}

		renderBufferProperties.__webglRenderbuffer = webglRenderbuffer;
		renderBufferProperties.__external = true;
	}

}

export { WebGLRenderBuffers };