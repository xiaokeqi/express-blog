/**
 * Html5上传文件处理插件
 */
var ERRORS = {};

function QUpload(opts) {
	this.opts = opts;
	this.filesDone = 0;
	this.filesCount = 0;
	this.filesLength = 0;

	ERRORS = {
		"MAXCOUNT": "一次最多上传" + this.opts.maxfiles + "张图片。",
		"MAXSIZE": "文件太大，请不要超过" + this.opts.maxfilesize + "。",
		"TYPE": "文件格式错误，请上传JPG/PNG/GIF格式图片。"
	};
	this.bindElement();
};

QUpload.prototype = {
	bindElement: function() {
		var that = this,
			files,
			fileTypeStr = '',
			fileTypeArr = [],
			htmlStr = '';

		/**
		 * 图片类型
		 */
		if (this.opts.fileType) {
			fileTypeArr = this.opts.fileType.split(/;|；/g);
			for (var i = 0, len = fileTypeArr.length; i < len; i++) {
				var aType = fileTypeArr[i].split('*.');
				if (aType.length == 2) {
					if (i == len - 1) {
						fileTypeStr += 'image/' + aType[1];
					} else {
						fileTypeStr += 'image/' + aType[1] + ',';
					}
				}
			}
		}
		/**
		 * 是否支持图片多选
		 */
		if (this.opts.multi) {
			this.opts.multi = 'multiple="multiple"';
		} else {
			this.opts.multi = '';
		}


		htmlStr = '<label style="cursor: pointer;border: solid 1px #7EC0EE;height: 70px;position: fixed;right: 10px;top: 50%;border-radius: 70px;width: 70px;text-align: center;line-height: 70px;background: #7EC0EE;color:#fff;">' + this.opts.buttonText + '<input  type="file" id="file" style="display:none;width:' + this.opts.width + 'px;height:' + this.opts.height + 'px" class="h5uploadway ' + this.opts.buttonClass + '" ' + this.opts.multi + ' accept="' + fileTypeStr + '"></label>';
		this.opts.dom.html(htmlStr);
		this.opts.dom.find('.h5uploadway').on('change', function() {
			files = Array.prototype.slice.call(this.files);
			that.checkfiles(files);
		});
	},
	checkfiles: function(files) {
		var qualifiedFiles = [],
			wrongName = "",
			filesCount = files.length,
			maxSize = parseInt(this.opts.maxfilesize, 10) * 1024 * 1024,
			_this = this,
			errCode = 0,
			isDefineUploadType = $.type(this.opts.upload_file_type) == 'regexp';

		//无图片返回
		if (filesCount < 1) {
			return this.onerror(files, -120, ERRORS.MAXCOUNT);
		}
		//图片是否超过单次上传限制	
		if (filesCount > this.opts.maxfiles) {
			return this.onerror(files, -100, ERRORS.MAXCOUNT);
		}

		//判断是否是图片
		if ($.isArray(files)) {
			files.forEach(function(file, i) {
				if (isDefineUploadType ? _this.opts.upload_file_type.test(file.type) : /image\/\w+/.test(file.type)) {
					qualifiedFiles.push(file);
				} else {
					if (i == files.length - 1) {
						wrongName += file.name + ERRORS.TYPE;
					} else {
						wrongName += file.name + "，";
					}
					errCode = -130;
				}
			});

			// 如果是普通的对象，例如粘贴得到的文件对象
		} else if (isDefineUploadType ? _this.opts.upload_file_type.test(files.type) : /image\/\w+/.test(files.type)) {
			files.name = files.name || (new Date().getTime() + '.' + files.type.substr('image/'.length));
			qualifiedFiles.push(files);
		}

		//判断文件大小
		files = [];
		qualifiedFiles.forEach(function(file, i) {
			if (file.size <= maxSize) {
				files.push(file);
			} else {
				if (i == qualifiedFiles.length - 1) {
					wrongName += file.name + ERRORS.MAXSIZE;
				} else {
					wrongName += file.name + "，";
				}
				errCode = -110;
			}
		});

		if (wrongName.length > 0) {
			this.onerror(files, errCode, wrongName);
		}

		if (files.length < 1) {
			return;
		}

		if (this.beforeUpload(files)) {
			this.upload(files);
		}
	},
	onerror: function(files, errCode, errmsg) {
		return this.opts.onerror(files, errCode, errmsg) && false;
	},
	beforeUpload: function(files) {
		this.opts.beforeUpload(files);
		return true;
	},
	upload: function(files) {
		var that = this;
		that.filesLength = files.length;
		that.filesDone = 0;
		files.forEach(function(filesObj, index) {
			that.analyData(filesObj);
		});
	},
	analyData: function(filesObj) {
		try {
			var that = this;
			if (this.opts.uploadType == "BinaryString") {
				var formData = new FormData();
				if (this.opts.formData) {
					for (var o in this.opts.formData) {
						formData.append(o, this.opts.formData[o])
					}
				}
				formData.append(this.opts.paramname, filesObj);
				this.send(filesObj, formData); //发送二进制
			} else if (this.opts.uploadType == "DataURL") {
				var reader = new FileReader();
				reader.readAsDataURL(filesObj);
				reader.onloadend = function(e) {
					var r = this.opts.paramname + '=' + this.result.split(',')[1];
					that.send(filesObj, r); //发送base64数据给后端
				}
			}

		} catch (err) {
			return this.onerror(filesObj, err);
		}

	},
	send: function(filesObj, result) {
		var that = this,
			xhr = new XMLHttpRequest(),
			upload = xhr.upload;

		filesObj.currentProgress = 0;
		filesObj.startData = 0;
		filesObj.startTime = Date.now();
		filesObj.id = +(filesObj.lastModifiedDate) + parseInt(Math.random() * 100000); //每个文件一个特定的id
		upload.addEventListener("progress", function(event) {
			that.progress(event, filesObj);
		}, false);
		xhr.open("POST", this.opts.url, true);

		if (this.opts.uploadType == "DataURL") {
			xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
		}
		xhr.send(result);
		this.opts.uploadStarted(filesObj); //上传开始回调
		xhr.onload = function() {
			if (xhr.responseText) {
				filesObj.timeDiff = Date.now() - filesObj.startTime;
				that.opts.uploadFinished(filesObj, xhr.responseText);
				that.filesDone++;
				if (that.filesDone == that.filesLength) {
					that.afterAll();
				}
			}
		};
	},
	progress: function(event, filesObj) {
		if (event.lengthComputable) {
			var loaded = event.loaded,
				percentage = Math.round((loaded * 100) / event.total);
			if (filesObj.currentProgress != percentage) {
				filesObj.currentProgress = percentage; //上传进度
				var now = Date.now(),
					diffTime = now - (filesObj.currentStart ? filesObj.currentStart : filesObj.startTime),
					diffData = loaded - filesObj.startData;
				filesObj.speed = Math.floor(diffData / diffTime); // KB per second
				filesObj.startData = loaded;
				filesObj.currentStart = now;
				this.opts.progressUpdated(filesObj);
			}
		}
	},
	afterAll: function() {
		return this.opts.afterAll();
	}
};

export default {
	html5Upload: function(options) {
		var opts = $.extend(true, {
			url: '',
			loadImg: 'http://p6.qhimg.com/t01798cd1a6b1065192.gif',
			paramname: 'upfile',
			maxfiles: 5,
			uploadType: "BinaryString",
			maxfilesize: 1024 * 1024 * 5,
			afterAll: function() {},
			onerror: function() {},
			beforeUpload: function() {},
			uploadStarted: function() {},
			uploadFinished: function() {},
			progressUpdated: function() {}
		}, options);

		var ql = new QUpload(opts);
		return ql;
	}
}