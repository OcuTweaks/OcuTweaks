module.exports = (electron) => {
	let patchedOculus = false;

	const appSetAppUserModelId = electron.app.setAppUserModelId;
	function setAppUserModelId(...args) {
		appSetAppUserModelId.apply(this, args);
		if (patchedOculus) patchedOculus = true;
	}

	electron.app.setAppUserModelId = setAppUserModelId;
};
