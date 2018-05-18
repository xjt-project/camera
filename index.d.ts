import { IonicNativePlugin } from '@ionic-native/core';
export interface CameraOptions {
    /** Picture quality in range 0-100. Default is 50 */
    quality?: number;
    /**
     * Choose the format of the return value.
     * Defined in Camera.DestinationType. Default is FILE_URI.
     *      DATA_URL : 0,   Return image as base64-encoded string,
     *      FILE_URI : 1,   Return image file URI,
     *      NATIVE_URI : 2  Return image native URI
     *          (e.g., assets-library:// on iOS or content:// on Android)
     */
    destinationType?: number;
    /**
     * Set the source of the picture.
     * Defined in Camera.PictureSourceType. Default is CAMERA.
     *      PHOTOLIBRARY : 0,
     *      CAMERA : 1,
     *      SAVEDPHOTOALBUM : 2
     */
    sourceType?: number;
    /** Allow simple editing of image before selection. */
    allowEdit?: boolean;
    /**
     * Choose the returned image file's encoding.
     * Defined in Camera.EncodingType. Default is JPEG
     *      JPEG : 0    Return JPEG encoded image
     *      PNG : 1     Return PNG encoded image
     */
    encodingType?: number;
    /**
     * Width in pixels to scale image. Must be used with targetHeight.
     * Aspect ratio remains constant.
    */
    targetWidth?: number;
    /**
     * Height in pixels to scale image. Must be used with targetWidth.
     * Aspect ratio remains constant.
     */
    targetHeight?: number;
    /**
     * Set the type of media to select from. Only works when PictureSourceType
     * is PHOTOLIBRARY or SAVEDPHOTOALBUM. Defined in Camera.MediaType
     *      PICTURE: 0      allow selection of still pictures only. DEFAULT.
     *          Will return format specified via DestinationType
     *      VIDEO: 1        allow selection of video only, WILL ALWAYS RETURN FILE_URI
     *      ALLMEDIA : 2    allow selection from all media types
     */
    mediaType?: number;
    /** Rotate the image to correct for the orientation of the device during capture. */
    correctOrientation?: boolean;
    /** Save the image to the photo album on the device after capture. */
    saveToPhotoAlbum?: boolean;
    /**
     * Choose the camera to use (front- or back-facing).
     * Defined in Camera.Direction. Default is BACK.
     *      BACK: 0
     *      FRONT: 1
     */
    cameraDirection?: number;
    /** iOS-only options that specify popover location in iPad. Defined in CameraPopoverOptions. */
    popoverOptions?: CameraPopoverOptions;

     /************************以下为消检通新增的属性************************/
     
     /*
      * 要添加的水印文字内容，数组中的每一项（每一个元素）都会单独绘制一行。 可选参数
      * 注意：
      *    1，要添加水印的时候，Camera.DestinationType必须设置为FILE_URI
      *    2, 添加完水印后，会保存两张图片到磁盘上面：一张带水印的小图、一张带水印的大图；小图一般用于APP显示、大图用于浏览或上传到服务器
      *    3，如果设置了shadeText，getPicture回调方法会返回两张图片在磁盘上的地址，返回格式：大图片地址|小图片地址；
      *    4，使用完以后，应调用clearCacheImageFromDisk方法从磁盘上删除
      */
     shadeText?: string; 

     /**
      *  水印小图片的压缩倍数，设置的越大，返回的小图片尺寸就越低。可选参数
      *  注意：
      *     1，要设置了shadeText，compressMultiple属性才会生效
      *     2，如果设置了shadeText，可以不用设置compressMultiple，默认为10
      *  比如：
      *      设置 compressMultiple=8，表示返回的小图为原图（大图）的 1/8
      */
     compressMultiple?: number;

     /**
      * 相机类型：0 为系统相机 ， 1 为自定义相机 。默认为0（系统相机）  
      * 注意：
      *    这个参数只对Android管用
      */
     cameraType?:number;
}
/**
 * iOS-only parameters that specify the anchor element location and arrow direction
 * of the popover when selecting images from an iPad's library or album.
 */
export interface CameraPopoverOptions {
    x: number;
    y: number;
    width: number;
    height: number;
    /**
     * Direction the arrow on the popover should point. Defined in Camera.PopoverArrowDirection
     * Matches iOS UIPopoverArrowDirection constants.
     *      ARROW_UP : 1,
     *      ARROW_DOWN : 2,
     *      ARROW_LEFT : 4,
     *      ARROW_RIGHT : 8,
     *      ARROW_ANY : 15
     */
    arrowDir: number;
}
export declare enum DestinationType {
    DATA_URL = 0,
    FILE_URL = 1,
    NATIVE_URI = 2,
}
export declare enum EncodingType {
    JPEG = 0,
    PNG = 1,
}
export declare enum MediaType {
    PICTURE = 0,
    VIDEO = 1,
    ALLMEDIA = 2,
}
export declare enum PictureSourceType {
    PHOTOLIBRARY = 0,
    CAMERA = 1,
    SAVEDPHOTOALBUM = 2,
}
export declare enum PopoverArrowDirection {
    ARROW_UP = 1,
    ARROW_DOWN = 2,
    ARROW_LEFT = 3,
    ARROW_RIGHT = 4,
    ARROW_ANY = 5,
}
export declare enum Direction {
    BACK = 0,
    FRONT = 1,
}
/**
 * @name Camera
 * @description
 * Take a photo or capture video.
 *
 * Requires the Cordova plugin: `cordova-plugin-camera`. For more info, please see the [Cordova Camera Plugin Docs](https://github.com/apache/cordova-plugin-camera).
 *
 * @usage
 * ```typescript
 * import { Camera, CameraOptions } from '@ionic-native/camera';
 *
 * constructor(private camera: Camera) { }
 *
 * ...
 *
 *
 * const options: CameraOptions = {
 *   quality: 100,
 *   destinationType: this.camera.DestinationType.DATA_URL,
 *   encodingType: this.camera.EncodingType.JPEG,
 *   mediaType: this.camera.MediaType.PICTURE
 * }
 *
 * this.camera.getPicture(options).then((imageData) => {
 *  // imageData is either a base64 encoded string or a file URI
 *  // If it's base64:
 *  let base64Image = 'data:image/jpeg;base64,' + imageData;
 * }, (err) => {
 *  // Handle error
 * });
 * ```
 * @interfaces
 * CameraOptions
 * CameraPopoverOptions
 */
export declare class Camera extends IonicNativePlugin {
    /**
     * Constant for possible destination types
     */
    DestinationType: {
        DATA_URL: number;
        FILE_URI: number;
        NATIVE_URI: number;
    };
    /**
     * Convenience constant
     */
    EncodingType: {
        JPEG: number;
        PNG: number;
    };
    /**
     * Convenience constant
     */
    MediaType: {
        PICTURE: number;
        VIDEO: number;
        ALLMEDIA: number;
    };
    /**
     * Convenience constant
     */
    PictureSourceType: {
        PHOTOLIBRARY: number;
        CAMERA: number;
        SAVEDPHOTOALBUM: number;
    };
    /**
     * Convenience constant
     */
    PopoverArrowDirection: {
        ARROW_UP: number;
        ARROW_DOWN: number;
        ARROW_LEFT: number;
        ARROW_RIGHT: number;
        ARROW_ANY: number;
    };
    /**
     * Convenience constant
     */
    Direction: {
        BACK: number;
        FRONT: number;
    };
    /**
     * Take a picture or video, or load one from the library.
     * @param {CameraOptions} [options] Options that you want to pass to the camera. Encoding type, quality, etc. Platform-specific quirks are described in the [Cordova plugin docs](https://github.com/apache/cordova-plugin-camera#cameraoptions-errata-).
     * @returns {Promise<any>} Returns a Promise that resolves with Base64 encoding of the image data, or the image file URI, depending on cameraOptions, otherwise rejects with an error.
     */
    getPicture(options?: CameraOptions): Promise<any>;
    /**
     * Remove intermediate image files that are kept in temporary storage after calling camera.getPicture.
     * Applies only when the value of Camera.sourceType equals Camera.PictureSourceType.CAMERA and the Camera.destinationType equals Camera.DestinationType.FILE_URI.
     * @returns {Promise<any>}
     */
    cleanup(): Promise<any>;


    /************************以下为消检通新增加的方法************************/

    /*
    * 从磁盘中清除所有缓存的图片
    * 注意：
    *    1，如果设置了shadeText，使用完图片以后，应该调用该方法将图片从磁盘中清除；
    *    2，建议在组件缷载的时候再删除
    * @returns {Promise<any>}
    */
    clearCacheImageFromDisk(): Promise<any>;

}
