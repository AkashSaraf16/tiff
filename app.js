import fs from 'fs';
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import proj4 from 'proj4';

function toArrayBuffer(buffer) {
	const arrayBuffer = new ArrayBuffer(buffer.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return arrayBuffer;
}

async function getTiffData(url) {
	var buffer = fs.readFileSync('./visualization.tif');
	const arrayBuffer = toArrayBuffer(buffer)
	const tif = await fromArrayBuffer(arrayBuffer);
	const img = await tif.getImage();
	const imgWidth = img.getWidth();
	const imgHeight = img.getHeight();
	console.log(img)
	const sourceCrs = `EPSG:3857`;
    const targetCrs = 'EPSG:4326';

	const convertedSW = proj4(sourceCrs, targetCrs, [...img.getOrigin()]);

	console.log('metadata', convertedSW);
}
getTiffData().then(d => console.log(d));