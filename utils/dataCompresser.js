const { gzipSync, gunzipSync } = require('zlib');

// const Post = sequelize.define('post', {
//   content: {
//     type: DataTypes.TEXT,
//     get() {
//       const storedValue = this.getDataValue('content');
//       const gzippedBuffer = Buffer.from(storedValue, 'base64');
//       const unzippedBuffer = gunzipSync(gzippedBuffer);
//       return unzippedBuffer.toString();
//     },
//     set(value) {
//       const gzippedBuffer = gzipSync(value);
//       this.setDataValue('content', gzippedBuffer.toString('base64'));
//     },
//   },
// });

export const compress = () =>{
    const get = (obj,obName)=>{
        const storedValue = obj.getDataValue(`${obName}`);
        const gzippedBuffer = Buffer.from(storedValue, 'base64');
        const unzippedBuffer = gunzipSync(gzippedBuffer);
        return unzippedBuffer.toString();
    };
    const set = (obj,value) =>{
        const gzippedBuffer = gzipSync(value);
        obj.setDataValue('content', gzippedBuffer.toString('base64'));
    }

}