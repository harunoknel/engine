pc.extend(pc, function () {
    /**
    * @name pc.Matrix4
    * @class A 4x4 matrix.
    * @constructor Creates a new Matrix4 object
    * @property {pc.Matrix4} identity [Read only] The identity matrix.
    * @property {pc.Matrix4} zero [Read only] A matrix with all elements set to zero.
    */
    var Matrix4 = function () {
        this.data = new Float32Array(16);

        if (arguments.length === 16) {
            this.data.set(arguments);
        } else {
            this.setIdentity();
        }
    };

    Object.defineProperty(Matrix4, 'identity', {
        get: function () {
            var identity = new pc.Matrix4();
            return function() {
                return identity;
            }
        }()
    });

    Object.defineProperty(Matrix4, 'zero', {
        get: function () {
            var zero = new pc.Matrix4(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
            return function() {
                return zero;
            }
        }()
    });

    /**
     * @function
     * @name pc.Matrix4.add
     * @description Returns the result of adding the specified 4x4 matrices together.
     * @param {pc.Matrix4} lhs The 4x4 matrix used as the first multiplicand of the operation.
     * @param {pc.Matrix4} rhs The 4x4 matrix used as the second multiplicand of the operation.
     * @param {pc.Matrix4} [res] The result of the addition. If left undefined, a new matrix is
     * created internally.
     * @returns 
     * @example
     * var a = pc.math.mat4.makeTranslate(10, 20, 30);
     * var b = pc.math.mat4.makeRotate(180, [0, 1, 0]);
     *
     * // Generate result into a new matrix and return it
     * a.mul(b);
     * 
     * console.log("The result of the multiplication is: " a.toString());
     * @author Will Eastcott
     */
    Matrix4.add = function (lhs, rhs, res) {
        if (typeof res === 'undefined') {
            res = new pc.Matrix();
        }

        var a = lhs.data;
        var b = rhs.data;
        var r = res.data;

        r[0] = a[0] + b[0];
        r[1] = a[1] + b[1];
        r[2] = a[2] + b[2];
        r[3] = a[3] + b[3];
        r[4] = a[4] + b[4];
        r[5] = a[5] + b[5];
        r[6] = a[6] + b[6];
        r[7] = a[7] + b[7];
        r[8] = a[8] + b[8];
        r[9] = a[9] + b[9];
        r[10] = a[10] + b[10];
        r[11] = a[11] + b[11];
        r[12] = a[12] + b[12];
        r[13] = a[13] + b[13];
        r[14] = a[14] + b[14];
        r[15] = a[15] + b[15];

        return res;
    };

    /**
     * @function
     * @name pc.Matrix4#add
     * @description Returns the result of adding the specified 4x4 matrices together.
     * @param {pc.Matrix4} rhs The 4x4 matrix used as the second multiplicand of the operation.
     * @example
     * var a = pc.math.mat4.makeTranslate(10, 20, 30);
     * var b = pc.math.mat4.makeRotate(180, [0, 1, 0]);
     *
     * // Generate result into a new matrix and return it
     * a.add(b);
     * 
     * console.log("The result of the addition is: " a.toString());
     * @author Will Eastcott
     */
    Matrix4.prototype.add = function (rhs) {
        Matrix4.add(this, rhs, this);
        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#clone
     * @description Creates a duplicate of the specified matrix.
     * @example
     * var src = new pc.Matrix4().translate(10, 20, 30);
     * var dst = new pc.Matrix4();
     * dst.copy(src);
     * console.log("The two matrices are " + (src.equal(dst) ? "equal" : "different"));
     * @author Will Eastcott
     */
    Matrix4.prototype.clone = function () {
        return new pc.Matrix4().copy(this);
    };

    /**
     * @function
     * @name pc.Matrix4#copy
     * @description Copies the contents of a source 4x4 matrix to a destination 4x4 matrix.
     * @param {pc.Matrix4} src A 4x4 matrix to be copied.
     * var src = new pc.Matrix4().translate(10, 20, 30);
     * var dst = new pc.Matrix4();
     * dst.copy(src);
     * console.log("The two matrices are " + (src.equal(dst) ? "equal" : "different"));
     * @author Will Eastcott
     */
    Matrix4.prototype.copy = function (rhs) {
        var src = rhs.data;
        var dst = this.data;

        dst[0] = src[0];
        dst[1] = src[1];
        dst[2] = src[2];
        dst[3] = src[3];
        dst[4] = src[4];
        dst[5] = src[5];
        dst[6] = src[6];
        dst[7] = src[7];
        dst[8] = src[8];
        dst[9] = src[9];
        dst[10] = src[10];
        dst[11] = src[11];
        dst[12] = src[12];
        dst[13] = src[13];
        dst[14] = src[14];
        dst[15] = src[15];

        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#equals
     * @description Reports whether two matrices are equal.
     * @returns {Booean} true if the matrices are equal and false otherwise.
     * var a = new pc.Matrix4().translate(10, 20, 30);
     * var b = new pc.Matrix4();
     * console.log("The two matrices are " + (a.equal(b) ? "equal" : "different"));
     * @author Will Eastcott
     */
    Matrix4.prototype.equals = function (rhs) {
        var l = this.data;
        var r = rhs.data;
        return
           ((l[0] === r[0]) &&
            (l[1] === r[1]) &&
            (l[2] === r[2]) &&
            (l[3] === r[3]) &&
            (l[4] === r[4]) &&
            (l[5] === r[5]) &&
            (l[6] === r[6]) &&
            (l[7] === r[7]) &&
            (l[8] === r[8]) &&
            (l[9] === r[9]) &&
            (l[10] === r[10]) &&
            (l[11] === r[11]) &&
            (l[12] === r[12]) &&
            (l[13] === r[13]) &&
            (l[14] === r[14]) &&
            (l[15] === r[15]));
    };

    /**
     * @function
     * @name pc.Matrix4#isIdentity
     * @description Reports whether the specified matrix is the identity matrix.
     * @returns {Booean} true if the matrix is identity and false otherwise.
     * var m = new pc.Matrix4();
     * console.log("The matrix is " + (m.isIdentity() ? "identity" : "not identity"));
     * @author Will Eastcott
     */
    Matrix4.prototype.isIdentity = function () {
        var m = this.data;
        return
           ((m[0] === 1) &&
            (m[1] === 0) &&
            (m[2] === 0) &&
            (m[3] === 0) &&
            (m[4] === 0) &&
            (m[5] === 1) &&
            (m[6] === 0) &&
            (m[7] === 0) &&
            (m[8] === 0) &&
            (m[9] === 0) &&
            (m[10] === 1) &&
            (m[11] === 0) &&
            (m[12] === 0) &&
            (m[13] === 0) &&
            (m[14] === 0) &&
            (m[15] === 1));
    };

    /**
     * @function
     * @name pc.Matrix4.mul
     * @description Returns the result of multiplying the specified 4x4 matrices together.
     * @param {pc.Matrix4} lhs The 4x4 matrix used as the first multiplicand of the operation.
     * @param {pc.Matrix4} rhs The 4x4 matrix used as the second multiplicand of the operation.
     * @param {pc.Matrix4} res The result of the multiplication.
     * @example
     * var a = pc.math.mat4.makeTranslate(10, 20, 30);
     * var b = pc.math.mat4.makeRotate(180, [0, 1, 0]);
     *
     * // Generate result into a new matrix and return it
     * a.mul(b);
     * 
     * console.log("The result of the multiplication is: " a.toString());
     * @author Will Eastcott
     */
    Matrix4.mul = function (lhs, rhs, res) {
        if (typeof res === 'undefined') {
            res = new pc.Matrix();
        }

        var a = lhs.data;
        var b = rhs.data;
        var r = res.data;

        var a00 = a[0];
        var a01 = a[1];
        var a02 = a[2];
        var a03 = a[3];
        var a10 = a[4];
        var a11 = a[5];
        var a12 = a[6];
        var a13 = a[7];
        var a20 = a[8];
        var a21 = a[9];
        var a22 = a[10];
        var a23 = a[11];
        var a30 = a[12];
        var a31 = a[13];
        var a32 = a[14];
        var a33 = a[15];

        var b0 = b[0];
        var b1 = b[1];
        var b2 = b[2];
        var b3 = b[3];
        r[0]  = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[1]  = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[2]  = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[3]  = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b[4];
        b1 = b[5];
        b2 = b[6];
        b3 = b[7];
        r[4]  = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[5]  = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[6]  = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[7]  = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b[8];
        b1 = b[9];
        b2 = b[10];
        b3 = b[11];
        r[8]  = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[9]  = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[10] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[11] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        b0 = b[12];
        b1 = b[13];
        b2 = b[14];
        b3 = b[15];
        r[12] = a00 * b0 + a10 * b1 + a20 * b2 + a30 * b3;
        r[13] = a01 * b0 + a11 * b1 + a21 * b2 + a31 * b3;
        r[14] = a02 * b0 + a12 * b1 + a22 * b2 + a32 * b3;
        r[15] = a03 * b0 + a13 * b1 + a23 * b2 + a33 * b3;

        return res;
    };

    /**
     * @function
     * @name pc.Matrix4#mul
     * @description Returns the result of multiplying the specified 4x4 matrices together.
     * @param {Array} m0 The 4x4 matrix used as the first multiplicand of the operation.
     * @param {Array} m1 The 4x4 matrix used as the second multiplicand of the operation.
     * @param {Array} r The result of the multiplication.
     * @returns {Array} The result of the multiplication (effectively a reference to the r parameter).
     * @example
     * var a = pc.math.mat4.makeTranslate(10, 20, 30);
     * var b = pc.math.mat4.makeRotate(180, [0, 1, 0]);
     *
     * // Generate result into a new matrix and return it
     * a.mul(b);
     * 
     * console.log("The result of the multiplication is: " a.toString());
     * @author Will Eastcott
     */
    Matrix4.prototype.mul = function (rhs) {
        Matrix4.mul(this, rhs, this);
        return this;
    };

    /**
     * @function
     * @name pc.math.mat4.multiplyVec3
     * @description Multiplies a 3-dimensional vector by a 4x4 matrix. Se
     * @param {Array} v The 3-dimensional vector to be multiplied.
     * @param {Number} w The w-component of vector v.
     * @param {Array} m The matrix to which vector v is multiplied.
     * @param {Array} r An optional 3-dimensional vector to receive the result of the multiplication.
     * @returns {Array} The input vector v multiplied by input matrix m.
     * @example
     * // Create a 3-dimensional vector
     * var v = pc.math.vec3.create(1, 2, 3);
     * // Create a 4x4 translation matrix
     * var m = pc.math.mat4.makeTranslate(10, 20, 30);
     *
     * var mv = pc.math.mat4.multiplyVec3(v, 1.0, m);
     *
     * @author Will Eastcott
     */
    Matrix4.mulVec3 = function (mtx, vec, w, res) {
        if (typeof res === 'undefined') {
            res = new pc.Vector3();
        }

        var m = mtx.data;
        var v = vec.data;
        var r = res.data;

        var x, y, z;
        x =
            v[0] * m[0] +
            v[1] * m[4] +
            v[2] * m[8] +
            w * m[12];
        y = 
            v[0] * m[1] +
            v[1] * m[5] +
            v[2] * m[9] +
            w * m[13];
        z =
            v[0] * m[2] +
            v[1] * m[6] +
            v[2] * m[10] +
            w * m[14];
        r[0] = x;
        r[1] = y;
        r[2] = z;

        return res;
    };

    /**
     * @function
     * @name pc.math.mat4.makeLookAt
     * @description Creates a viewing matrix derived from an eye point, a reference point indicating the center
     * of the scene, and an up vector. The matrix maps the reference point to the negative z-axis and the eye
     * point to the origin, so that when you use a typical projection matrix, the center of the scene maps to 
     * the center of the viewport. Similarly, the direction described by the up vector projected onto the
     * viewing plane is mapped to the positive y-axis so that it points upward in the viewport. The up vector
     * must not be parallel to the line of sight from the eye to the reference point.
     * @param {Float32Array} position 3-d vector holding view position.
     * @param {Float32Array} target 3-d vector holding reference point.
     * @param {Float32Array} up 3-d vector holding the up direction.
     * @param {Float32Array} [r] 4x4 matrix to receive the calculated lookAt matrix.
     * @returns {Float32Array} The calculated lookAt matrix.
     * @example
     * var position = pc.math.vec3.create(10, 10, 10);
     * var target = pc.math.vec3.create(0, 0, 0);
     * var up = pc.math.vec3.create(0, 1, 0);
     * var lookAt = pc.math.mat4.makeLookAt(position, target, up);
     * @author Will Eastcott
     */
    Matrix4.prototype.lookAt = function () {
        var x = pc.Vector3();
        var y = pc.Vector3();
        var z = pc.Vector3();

        return function (position, target, up) {
            z.subtract(position, target).normalize();
            y.copy(up).normalize();
            x.cross(y, z).normalize();
            y.cross(z, x);

            var r = this.data;

            r[0]  = x[0];
            r[1]  = x[1];
            r[2]  = x[2];
            r[3]  = 0;
            r[4]  = y[0];
            r[5]  = y[1];
            r[6]  = y[2];
            r[7]  = 0;
            r[8]  = z[0];
            r[9]  = z[1];
            r[10] = z[2];
            r[11] = 0;
            r[12] = position[0];
            r[13] = position[1];
            r[14] = position[2];
            r[15] = 1;

            return this;
        };
    }();

    /**
     * @function
     * @name pc.math.mat4.makeFrustum
     * @description Generates a persective projection matrix. The function's parameters define
     * the shape of a frustum.
     * @param {Number} left The x-coordinate for the left edge of the camera's projection plane in eye space.
     * @param {Number} right The x-coordinate for the right edge of the camera's projection plane in eye space.
     * @param {Number} bottom The y-coordinate for the bottom edge of the camera's projection plane in eye space.
     * @param {Number} top The y-coordinate for the top edge of the camera's projection plane in eye space.
     * @param {Number} znear The near clip plane in eye coordinates.
     * @param {Number} zfar The far clip plane in eye coordinates.
     * @param {Array} r An optional 4x4 matrix to receive the generated perspective projection matrix.
     * @returns {Array} The generated perspective projection matrix.
     * @example
     * // Create a 4x4 persepctive projection matrix
     * var persp = pc.math.mat4.makeFrustum(-2, 2, -1, 1, 1, 1000);
     * @author Will Eastcott
     */
    Matrix4.prototype.frustum = function (left, right, bottom, top, znear, zfar) {
        var temp1 = 2.0 * znear;
        var temp2 = right - left;
        var temp3 = top - bottom;
        var temp4 = zfar - znear;

        var r = this.data;
        r[0] = temp1 / temp2;
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = temp1 / temp3;
        r[6] = 0;
        r[7] = 0;
        r[8] = (right+left) / temp2;
        r[9] = (top+bottom) / temp3;
        r[10] = (-zfar-znear) / temp4;
        r[11] = -1.0;
        r[12] = 0;
        r[13] = 0;
        r[14] = (-temp1 * zfar) / temp4;
        r[15] = 0;

        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#perspective
     * @description Generates a persective projection matrix. The function's parameters define
     * the shape of a frustum.
     * @param {Number} fovy The field of view in the frustum in the Y-axis of eye space.
     * @param {Number} aspect The aspect ratio of the frustum's projection plane (width / height).
     * @param {Number} znear The near clip plane in eye coordinates.
     * @param {Number} zfar The far clip plane in eye coordinates.
     * @returns {pc.Matrix4} The generated perspective projection matrix (useful for chaining).
     * @example
     * // Create a 4x4 persepctive projection matrix
     * var persp = pc.Matrix4().perspective(45.0, 16.0/9.0, 1.0, 1000.0);
     * @author Will Eastcott
     */
    Matrix4.prototype.perspective = function (fovy, aspect, znear, zfar) {
        var ymax = znear * Math.tan(fovy * Math.PI / 360.0);
        var xmax = ymax * aspect;

        return this.frustum(-xmax, xmax, -ymax, ymax, znear, zfar);
    };
    
    /**
     * @function
     * @name pc.Matrix4#ortho
     * @description Generates an orthographic projection matrix. The function's parameters define
     * the shape of a cuboid-shaped frustum.
     * @param {Number} left The x-coordinate for the left edge of the camera's projection plane in eye space.
     * @param {Number} right The x-coordinate for the right edge of the camera's projection plane in eye space.
     * @param {Number} bottom The y-coordinate for the bottom edge of the camera's projection plane in eye space.
     * @param {Number} top The y-coordinate for the top edge of the camera's projection plane in eye space.
     * @param {Number} znear The near clip plane in eye coordinates.
     * @param {Number} zfar The far clip plane in eye coordinates.
     * @returns {pc.Matrix4} The generated perspective orthographic matrix (useful for chaining).
     * @example
     * // Create a 4x4 orthographic projection matrix
     * var ortho = pc.Matrix4().ortho(-2.0, 2.0, -2.0, 2.0, 1.0, 1000.0);
     * @author Will Eastcott
     */
    Matrix4.prototype.ortho = function (left, right, bottom, top, near, far) {
        var r = this.data;

        r[0] = 2 / (right - left);
        r[1] = 0;
        r[2] = 0;
        r[3] = 0;
        r[4] = 0;
        r[5] = 2 / (top - bottom);
        r[6] = 0;
        r[7] = 0;
        r[8] = 0;
        r[9] = 0;
        r[10] = -2 / (far - near);
        r[11] = 0;
        r[12] = -(right + left) / (right - left);
        r[13] = -(top + bottom) / (top - bottom);
        r[14] = -(far + near) / (far - near);
        r[15] = 1;
        
        return this;
    };

    /**
     * @function
     * @name pc.math.mat4.makeRotate
     * @description Generates a rotation matrix.
     * @param {Number} angle The angle of rotation in degrees.
     * @param {Array} axis The normalized axis vector around which to rotate.
     * @param {Array} r An optional 4x4 matrix to receive the generated rotation matrix.
     * @returns {Array} The generated rotation matrix.
     * @example
     * var yaxis = pc.math.vec3.create(0, 1, 0);
     *
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
     * var rotation = pc.math.mat4.makeRotate(180, yaxis);
     * @author Will Eastcott
     */
    Matrix4.prototype.rotate = function (angle, axis) {
        var m = this.data;
        var x = axis[0], y = axis[1], z = axis[2];
        var c = Math.cos(angle);
        var s = Math.sin(angle);
        var t = 1-c;
        var tx = t * x;
        var ty = t * y;

        m[0] = tx*x+c;
        m[1] = tx*y+s*z;
        m[2] = tx*z-s*y;
        m[3] = 0;
        m[4] = tx*y-s*z;
        m[5] = ty*y+c;
        m[6] = ty*z+s*x;
        m[7] = 0;
        m[8] = tx*z+s*y;
        m[9] = ty*z-x*s;
        m[10] = t*z*z+c;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    };

    /**
     * @function
     * @name pc.math.mat4.makeTranslate
     * @description Generates a translation matrix.
     * @param {Number} x The x-component of the translation.
     * @param {Number} y The y-component of the translation.
     * @param {Number} z The z-component of the translation.
     * @param {Array} r An optional 4x4 matrix to receive the generated translation matrix.
     * @returns {Array} The generated translation matrix.
     * @example
     * // Create a 4x4 translation matrix
     * var translation = pc.math.mat4.makeTranslate(10, 20, 30);
     * @author Will Eastcott
     */
    Matrix4.prototype.translate = function (tx, ty, tz) {
        var m = this.data;

        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = tx;
        m[13] = ty;
        m[14] = tz;
        m[15] = 1;

        return this;
    };

    /**
     * @function
     * @name pc.math.mat4.makeScale
     * @description Generates a scale matrix.
     * @param {Number} x The x-component of the scale.
     * @param {Number} y The y-component of the scale.
     * @param {Number} z The z-component of the scale.
     * @param {Array} r An optional 4x4 matrix to receive the generated scale matrix.
     * @returns {Array} The generated scale matrix.
     * @example
     * // Create a 4x4 scale matrix
     * var scale = pc.math.mat4.makeScale(10, 10, 10);
     * @author Will Eastcott
     */
    Matrix4.prototype.scale = function (sx, sy, sz) {
        var m = this.data;

        m[0] = sx;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = sy;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = sz;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#invert
     * @description Generates the inverse of the specified 4x4 matrix.
     * @returns {pc.Matrix4} The matrix being inverted.
     * @example
     * var yaxis = new pc.Vector3(0, 1, 0);
     *
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
     * var rot = new pc.Matrix4().rotate(180, yaxis);
     *
     * // Invert in place
     * rot.invert();
     * @author Will Eastcott
     */
    Matrix4.prototype.invert = function () {
        var m = this.data;

        var a00 = m[0],  a01 = m[1],  a02 = m[2],  a03 = m[3];
        var a10 = m[4],  a11 = m[5],  a12 = m[6],  a13 = m[7];
        var a20 = m[8],  a21 = m[9],  a22 = m[10], a23 = m[11];
        var a30 = m[12], a31 = m[13], a32 = m[14], a33 = m[15];

        var b00 = a00*a11 - a01*a10;
        var b01 = a00*a12 - a02*a10;
        var b02 = a00*a13 - a03*a10;
        var b03 = a01*a12 - a02*a11;
        var b04 = a01*a13 - a03*a11;
        var b05 = a02*a13 - a03*a12;
        var b06 = a20*a31 - a21*a30;
        var b07 = a20*a32 - a22*a30;
        var b08 = a20*a33 - a23*a30;
        var b09 = a21*a32 - a22*a31;
        var b10 = a21*a33 - a23*a31;
        var b11 = a22*a33 - a23*a32;

        var invDet = 1.0/(b00*b11 - b01*b10 + b02*b09 + b03*b08 - b04*b07 + b05*b06);

        m[0] = (a11*b11 - a12*b10 + a13*b09)*invDet;
        m[1] = (-a01*b11 + a02*b10 - a03*b09)*invDet;
        m[2] = (a31*b05 - a32*b04 + a33*b03)*invDet;
        m[3] = (-a21*b05 + a22*b04 - a23*b03)*invDet;
        m[4] = (-a10*b11 + a12*b08 - a13*b07)*invDet;
        m[5] = (a00*b11 - a02*b08 + a03*b07)*invDet;
        m[6] = (-a30*b05 + a32*b02 - a33*b01)*invDet;
        m[7] = (a20*b05 - a22*b02 + a23*b01)*invDet;
        m[8] = (a10*b10 - a11*b08 + a13*b06)*invDet;
        m[9] = (-a00*b10 + a01*b08 - a03*b06)*invDet;
        m[10] = (a30*b04 - a31*b02 + a33*b00)*invDet;
        m[11] = (-a20*b04 + a21*b02 - a23*b00)*invDet;
        m[12] = (-a10*b09 + a11*b07 - a12*b06)*invDet;
        m[13] = (a00*b09 - a01*b07 + a02*b06)*invDet;
        m[14] = (-a30*b03 + a31*b01 - a32*b00)*invDet;
        m[15] = (a20*b03 - a21*b01 + a22*b00)*invDet;

        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#identity
     * @description Sets the matrix to the identity matrix.
     * @returns {pc.Matrix4} The newly set identity matrix (useful for chaining).
     * var m = new pc.Matrix4().translate(10, 20, 30);
     * var dst = new pc.Matrix4();
     * dst.copy(src);
     * console.log("The two matrices are " + (src.equal(dst) ? "equal" : "different"));
     * @author Will Eastcott
     */
    Matrix4.prototype.setIdentity = function () {
        var m = this.data;
        m[0] = 1;
        m[1] = 0;
        m[2] = 0;
        m[3] = 0;
        m[4] = 0;
        m[5] = 1;
        m[6] = 0;
        m[7] = 0;
        m[8] = 0;
        m[9] = 0;
        m[10] = 1;
        m[11] = 0;
        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#setTRS
     * @description Composes a 4x4 matrix from a translation, a quaternion rotation and
     * a scale.
     * @param {pc.Vector3} t A 3-d vector translation.
     * @param {pc.Quaternion} r A quaternion rotation.
     * @param {pc.Vector3} s A 3-d vector scale.
     * @returns The newly composed matrix (useful for chaining).
     * @example
     * var m = new pc.Matrix4();
     * m.compose(t, r, s);
     * @author Will Eastcott
     */
    Matrix4.prototype.setTRS = function (t, r, s) {
        var qx = r.x;
        var qy = r.y;
        var qz = r.z;
        var qw = r.w;

        var x2 = qx + qx;
        var y2 = qy + qy;
        var z2 = qz + qz;
        var xx = qx * x2;
        var xy = qx * y2;
        var xz = qx * z2;
        var yy = qy * y2;
        var yz = qy * z2;
        var zz = qz * z2;
        var wx = qw * x2;
        var wy = qw * y2;
        var wz = qw * z2;

        var m = this.data;
        m[0] = (1.0 - (yy + zz)) * s[0];
        m[1] = (xy + wz) * s[0];
        m[2] = (xz - wy) * s[0];
        m[3] = 0.0;

        m[4] = (xy - wz) * s[1];
        m[5] = (1.0 - (xx + zz)) * s[1];
        m[6] = (yz + wx) * s[1];
        m[7] = 0.0;

        m[8] = (xz + wy) * s[2];
        m[9] = (yz - wx) * s[2];
        m[10] = (1.0 - (xx + yy)) * s[2];
        m[11] = 0.0;

        m[12] = t[0];
        m[13] = t[1];
        m[14] = t[2];
        m[15] = 1.0;

        return this;
    };

    /**
     * @function
     * @name pc.Matrix4#transpose
     * @description Generates the transpose of the specified 4x4 matrix.
     * @returns {pc.Matrix4} The transpose of the source matrix.
     * @example
     * var yaxis = pc.math.vec3.create(0, 1, 0);
     *
     * // Create a 4x4 rotation matrix of 180 degrees around the y-axis
     * var rot = pc.math.mat4.makeRotate(180, yaxis);
     *
     * // Transpose in place
     * pc.math.mat4.transpose(rot, rot);
     *
     * // Generate a new transpose matrix
     * var rotTranspose = pc.math.mat4.transpose(rot);
     * @author Will Eastcott
     */
    Matrix4.prototype.transpose = function () {
        var tmp = 0.0;
        tmp = m[1]; m[1] = m[4]; m[4] = tmp;
        tmp = m[2]; m[2] = m[8]; m[8] = tmp;
        tmp = m[3]; m[3] = m[12]; m[12] = tmp;
        tmp = m[6]; m[6] = m[9]; m[9] = tmp;
        tmp = m[7]; m[7] = m[13]; m[13] = tmp;
        tmp = m[11]; m[11] = m[14]; m[14] = tmp;

        return this;
    };

    Matrix4.prototype.invertTo3x3 = function () {
        var m = this.data;

        var a11 =  m[10] * m[5] - m[6] * m[9];
        var a21 = -m[10] * m[1] + m[2] * m[9];
        var a31 =  m[6]  * m[1] - m[2] * m[5];
        var a12 = -m[10] * m[4] + m[6] * m[8];
        var a22 =  m[10] * m[0] - m[2] * m[8];
        var a32 = -m[6]  * m[0] + m[2] * m[4];
        var a13 =  m[9]  * m[4] - m[5] * m[8];
        var a23 = -m[9]  * m[0] + m[1] * m[8];
        var a33 =  m[5]  * m[0] - m[1] * m[4];

        var det =  m[0] * a11 + m[1] * a12 + m[2] * a13;
        if (det == 0) { // no inverse
            console.warn("pc.Matrix4#invertTo3x3: Matrix not invertible");
            return r;
        }

        var idet = 1.0 / det;

        r[0] = idet * a11;
        r[1] = idet * a21;
        r[2] = idet * a31;
        r[3] = idet * a12;
        r[4] = idet * a22;
        r[5] = idet * a32;
        r[6] = idet * a13;
        r[7] = idet * a23;
        r[8] = idet * a33;

        return this;
    };

    /**
     * @function
     * @name pc.Vector3#getTranslation
     * @description Extracts the transational component from the specified 4x4 matrix.
     * @param {pc.Vector3} [t] The vector to receive the translation of the matrix.
     * @returns {pc.Vector3} The translation of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new pc.Matrix4();
     *
     * // Query the z-axis component
     * var t = new pc.Vector3();
     * m.getTranslation(t);
     * @author Will Eastcott
     */
    Matrix4.prototype.getTranslation = function (t) {
        if (typeof t === 'undefined') {
            t = new Vector3();
        }

        t.data[0] = this.data[12];
        t.data[1] = this.data[13];
        t.data[2] = this.data[14];

        return t;
    };

    /**
     * @function
     * @name pc.Vector3#getX
     * @description Extracts the x-axis from the specified 4x4 matrix.
     * @param {pc.Vector3} [x] The vector to receive the x axis of the matrix.
     * @returns {pc.Vector3} The x-axis of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new pc.Matrix4();
     *
     * // Query the z-axis component
     * var x = new pc.Vector3();
     * m.getX(x);
     * @author Will Eastcott
     */
    Matrix4.prototype.getX = function (x) {
        if (typeof x === 'undefined') {
            x = new Vector3();
        }

        x.data[0] = this.data[0];
        x.data[1] = this.data[1];
        x.data[2] = this.data[2];

        return x;
    };

    /**
     * @function
     * @name pc.Vector3#getY
     * @description Extracts the y-axis from the specified 4x4 matrix.
     * @param {pc.Vector3} [y] The vector to receive the y axis of the matrix.
     * @returns {pc.Vector3} The y-axis of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new pc.Matrix4();
     *
     * // Query the z-axis component
     * var y = new pc.Vector3();
     * m.getY(y);
     * @author Will Eastcott
     */
    Matrix4.prototype.getY = function (y) {
        if (typeof y === 'undefined') {
            y = new Vector3();
        }

        y.data[0] = this.data[4];
        y.data[1] = this.data[5];
        y.data[2] = this.data[6];

        return y;
    };

    /**
     * @function
     * @name pc.Vector3#getZ
     * @description Extracts the z-axis from the specified 4x4 matrix.
     * @param {pc.Vector3} [z] The vector to receive the z axis of the matrix.
     * @returns {pc.Vector3} The z-axis of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 matrix
     * var m = new pc.Matrix4();
     *
     * // Query the z-axis component
     * var z = new pc.Vector3();
     * m.getZ(z);
     * @author Will Eastcott
     */
    Matrix4.prototype.getZ = function (z) {
        if (typeof z === 'undefined') {
            z = new Vector3();
        }

        z.data[0] = this.data[8];
        z.data[1] = this.data[9];
        z.data[2] = this.data[10];

        return z;
    };
        
    /**
     * @function
     * @name pc.math.mat4.getScale
     * @description Extracts the scale component from the specified 4x4 matrix.
     * @param {Float32Array} m The source matrix to be queried.
     * @returns {Float32Array} The scale in X, Y and Z of the specified 4x4 matrix.
     * @example
     * // Create a 4x4 scale matrix
     * var scaleMat = pc.math.mat4.makeScale(2, 3, 4);
     *
     * // Query the scale component
     * var scale = pc.math.mat4.getScale(scaleMat);
     * @author Will Eastcott
     */
    Matrix4.prototype.getScale = function () {
        var x = new Vector3();
        var y = new Vector3();
        var z = new Vector3();

        return function (scale) {
            if (typeof scale === 'undefined') {
                scale = new Vector3();
            }

            this.getX(x);
            this.getY(y);
            this.getZ(z);
            scale.data[0] = x.length();
            scale.data[1] = y.length();
            scale.data[2] = z.length();

            return scale;
        };
    }();

    /**
     * @function
     * @name pc.Matrix4#fromEulerXYZ
     * @description Sets a 4x4 matrix from Euler angles specified in XYZ order.
     * @param {Number} ex Angle to rotate around X axis in radians.
     * @param {Number} ey Angle to rotate around Y axis in radians.
     * @param {Number} ez Angle to rotate around Z axis in radians.
     * @returns The 4x4 matrix representation of the supplied Euler angles.
     * @example
     * // Create a 4x4 scale matrix
     * var rotationMatrix = pc.math.mat4.fromEulerXYZ(45, 90, 180);
     * @author Will Eastcott
     */
    // http://en.wikipedia.org/wiki/Rotation_matrix#Conversion_from_and_to_axis-angle
    // The 3D space is right-handed, so the rotation around each axis will be counterclockwise 
    // for an observer placed so that the axis goes in his or her direction (Right-hand rule).
    Matrix4.prototype.setFromEulerXYZ = function (ex, ey, ez) {
        // Solution taken from http://en.wikipedia.org/wiki/Euler_angles#Matrix_orientation
        var s1 = Math.sin(-x);
        var c1 = Math.cos(-x);
        var s2 = Math.sin(-y);
        var c2 = Math.cos(-y);
        var s3 = Math.sin(-z);
        var c3 = Math.cos(-z);

        var m = this.data;

        // Set rotation elements
        m[0] = c2*c3;
        m[1] = -c2*s3;
        m[2] = s2;
        m[3] = 0;

        m[4] = c1*s3 + c3*s1*s2;
        m[5] = c1*c3 - s1*s2*s3;
        m[6] = -c2*s1;
        m[7] = 0;

        m[8] = s1*s3 - c1*c3*s2;
        m[9] = c3*s1 + c1*s2*s3;
        m[10] = c1*c2;
        m[11] = 0;

        m[12] = 0;
        m[13] = 0;
        m[14] = 0;
        m[15] = 1;

        return this;
    };

    /**
     * @function
     * @name pc.math.mat4.toEulerXYZ
     * @description Converts a 4x4 matrix to Euler angles specified in degrees in XYZ order.
     * @param {Float32Array} m The matrix to convert.
     * @param {Float32Array} [r] A 3-d vector to receive the Euler angles.
     * @returns A 3-d vector containing the Euler angles.
     * @example
     * var yaxis = pc.math.vec3.create(0, 1, 0);
     *
     * // Create a 4x4 rotation matrix of 45 degrees around the y-axis
     * var m = pc.math.mat4.makeRotate(45, yaxis);
     *
     * var eulers = pc.math.mat4.toEulerXYZ(m);
     * @author Will Eastcott
     */
    Matrix4.prototype.toEulerXYZ = function () {
        var scale = this.getScale();
        
        var x; 
        var y = Math.asin(-m[2] / scale[0]);
        var z;
        var HALF_PI = Math.PI / 2;
        if (y < HALF_PI) {
            if (y > -HALF_PI) {
                x = Math.atan2(m[6] / scale[1], m[10] / scale[2]);
                z = Math.atan2(m[1] / scale[0], m[0] / scale[0]);
            } else {
                // Not a unique solution
                z = 0;
                x = -Math.atan2(m[4] / scale[1], m[5] / scale[1]);
            }
        } else {
            // Not a unique solution
            z = 0;
            x = Math.atan2(m[4] / scale[1], m[5] / scale[1]);        
        }
        
        r[0] = x * pc.math.RAD_TO_DEG;
        r[1] = y * pc.math.RAD_TO_DEG;
        r[2] = z * pc.math.RAD_TO_DEG;

        return r;
    };

    Matrix4.prototype.toString = function () {
        var t = "[";
        for (var i = 0; i < this.data.length; i++) {
            t += this.data[i];
            t += (i !== this.data.length - 1) ? ", " : "";
        }
        t += "]";
        return t;
    };

    return {
        Matrix4: Matrix4
    };
}());