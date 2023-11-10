import fs from 'fs/promises';
import GeoTIFF, { fromUrl, fromUrls, fromArrayBuffer, fromBlob } from 'geotiff';
import proj4 from 'proj4';

async function saveDataToFile(filePath,dataToSave) {
	try {
	  await fs.writeFile(filePath, dataToSave);
	  console.log('Data saved to file successfully.');
	} catch (err) {
	  console.error('Error saving data to file:', err);
	}
  }

function toArrayBuffer(buffer) {
	const arrayBuffer = new ArrayBuffer(buffer.length);
	const view = new Uint8Array(arrayBuffer);
	for (let i = 0; i < buffer.length; ++i) {
		view[i] = buffer[i];
	}
	return arrayBuffer;
}

async function getTiffData(url) {
	var buffer = await fs.readFile('./shade.tif');
	const arrayBuffer = toArrayBuffer(buffer)
	const tif = await fromArrayBuffer(arrayBuffer);
	const img = await tif.getImage();
	// const imgWidth = img.getWidth();
	// const imgHeight = img.getHeight();
	// await saveDataToFile('vis.txt', img.)
	// console.log(tif.source)
	const sourceCrs = `EPSG:3857`;
    const targetCrs = 'EPSG:4326';

	// const sourceCrs = `EPSG:${zoneKey}`;
    //   const targetCrs = 'EPSG:4326';

      const convertedSW = proj4(sourceCrs, targetCrs, [
        img.getBoundingBox()[0],
        img.getBoundingBox()[1],
      ]);
      const convertedNE = proj4(sourceCrs, targetCrs, [
        img.getBoundingBox()[2],
        img.getBoundingBox()[3],
      ]);

	// const convertedSW = proj4(sourceCrs, targetCrs, [...img.getOrigin()]);

	console.log('metadata', convertedSW,convertedNE);
}
getTiffData().then(d => console.log(d));




