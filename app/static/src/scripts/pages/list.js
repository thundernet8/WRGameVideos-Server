define(function (require, exports) {

	var appConfig = require('../config'),
		getUrlParam = require('../utils/getUrlParam'),
		itemTpl = require('../templates/listItem'),
		jsToOC = require('../utils/jsToOC'),
		loading = require('../views/loading'),
		OpenPage = require('../utils/openPage'),
		localStore = require('../utils/localStorage'),
		pageBannerSet = require('../utils/pageBannerSet'),
		pageInfo = require('../utils/global'),
		listPage = 1,
		listSort = 'new',
		listCate = channel_id,
		panelShow = false,
		viewPtop,
		ajaxLock = 0,
		listHeightLast = 0,
		listHeightCurrent,
		newHeight,
		count = 0,
		showCount = 18,
		pageFilter = decodeURIComponent(getUrlParam('filter')),
		filterArry = pageFilter.split(',')

	require('../plugins/cookie');

	var fromPage = getUrlParam('from');

	var pageAlias = getUrlParam('cate_alias');

	var appVersion = parseFloat($.cookie('xy_a_version'));

	pageInfo.rightButtonDidTap = function () {

	    var panel = $('.panel'),
			page = $('.video-list'),
			pHeight = panel.height();
			
		if (!panelShow){
			
			panel.animate({
				'top': viewPtop
			},
			'fast',
			'linear',
			function(){
				panelShow = true;
			});

			page.animate({
				'paddingTop': pHeight + 15
			},
			'fast',
			'linear',
			function(){
				
			});

		}else{
			panel.animate({
				'top': -(pHeight - viewPtop + 1)
			},
			'fast',
			'linear',
			function(){
				panelShow = false;
			});

			page.animate({
				'paddingTop': 15
			},
			'fast',
			'linear',
			function(){
				
			});
		}

	}

	//模拟APP
	function simulate(){
		$('.pageView').before('<div class="navigationBar"><a href="javascript:void(0);" class="goBack">返回</a><a href="javascript:void(0);" class="rightButton">分类</a><div class="title">院线大片</div></div>');
		var pagePaddingTop = $('.navigationBar').height();
		$('.pageView').css({'padding-top': pagePaddingTop});
	}

	//获取页面数据
	function getList(){
		
		if (ajaxLock == 0){

			ajaxLock = 1;

				$.ajax({
		            url: appConfig.apiDomain + '/videos/channel/' + listCate + '/list' + appConfig.ajaxCallback,
		            data: {
		            	offset: (listPage-1)*showCount,
		            	limit: showCount,
		            	sort: listSort
		            },
		            type: 'GET',
		            dataType: 'json',
		            success: function (data) {

		            	if (data.status && data.videos){
							console.log(data);
		            		var data = data.videos,
		            			list = data,
		            			cateList = '',
		            			sortList = '',
		            			filterList = '',
		            			// cateTpl = '<dl class="category-list"><dt>分类</dt>',
		            			// sortTpl = '<dl class="sort-list"><dt>排序</dt>';
		            			cateTpl = '<dl class="category-list">',
		            			sortTpl = '<dl class="sort-list">';

		            		if (listPage == 1){
		            			$('.video-list .list-con').empty();
		            			$('html').scrollTop(0);

		            			if (listCate == 'youxi' || listCate == 'duanshipin/shishang' || listCate == 'duanshipin/gaoxiao' || listCate == 'duanshipin/lvyou' || listCate == 'fuli'){
		            				$('.video-list').addClass('video-list-landscape');
		            			}
		            		}

		            		$('.video-list .list-con').append(itemTpl(data));

		            		if (listPage > 1){
			            		if ($('.loader').length > 0){
			            			loading.hide();
			            		} 
			            		
			            	}else{
			            		if (!isNaN(appVersion) && appVersion>=3.2){
						            jsToOC.send('hidehud');
						        }
			            	}

		            		listPage ++;

		            		ajaxLock = 0;

		            		var count_new = $('.video-item').length,
	                            count_added = count_new - count;

	                        count = count_new;

	                        // debugger;

	                        if (count_added == showCount) {
	                            // self.page++;
	                            $('.video-list').on('scroll', handleScroll);
	                        }

	                        else if (listPage > 1) {

	                            $('.video-list .list-con').append('<div class="allItemsLoaded"></div>');
	                        }

		            		listHeightCurrent = $('.video-list .list-con').height();

		            		newHeight = listHeightCurrent - listHeightLast;

		            		listHeightLast = listHeightCurrent;

		            		if ($('.panel dl').length == 0){

		            			//分类
		            			if (cateList){
		            				for (var i = 0;i < cateList.length;i ++){
				            			var selectClass = cateList[i].alias == listCate ? 'selected' : '';
				            			cateTpl += '<dd><a class="cate-item ' + selectClass + '" data-target="' + cateList[i].cate_id + '" href="javascript:void(0);">' + cateList[i].name + '</a></dd>';
				            		};
				            		cateTpl += '</dl>';
			            			$('.panel').append(cateTpl);
		            			}else{
		            				$('.category-list').hide();
		            			}
		            			
		            			//过滤
		            			$('.filtet-cate-list').hide();
								$('.filtet-area-list').hide();
								$('.filtet-cele-list').hide();
								$('.sort-list').hide();


			            		
		            		}
		            		

		            	}else{

		            		$('.pageView').html('<div class="message">出错了,请重试</div>');

		            	}
		            	if (listPage > 1){
		            		if ($('.loader').length > 0){
		            			loading.hide();
		            		} 
		            		
		            	}else{
		            		if (!isNaN(appVersion) && appVersion>=3.2){
					            jsToOC.send('hidehud');
					        }
		            	}

		            },
		            error: function () {

		                $('.pageView').html('<div class="message">出错了,请重试</div>');

		            },
		            complete: function(){

		            	if (listPage > 1){
		            		if ($('.loader').length > 0){
		            			loading.hide();
		            		} 
		            	}else{
		            		if (!isNaN(appVersion) && appVersion>=3.2){
					            jsToOC.send('hidehud');
					        }
		            	}

		            	$('.video-list').css('opacity', '1');

		            }
		        });

			
		}
		
	}

	//展示panel
	function panelAction(){
		$('body').on(appConfig.clickEvent, '.rightButton', function(){
			
			pageInfo.rightButtonDidTap();

		})
	}

	//筛选
	function reGetList() {

		$('.pageView').on(appConfig.clickEvent, '.panel a', function(){

			var thiz = $(this),
				word = thiz.text(),
				target = thiz.data('target');

			listPage = 1;

			count = 0;

			if (thiz.hasClass('selected')) return;

			thiz.addClass('selected').parent().siblings().find('a').removeClass('selected');

			if (thiz.attr('class').indexOf('sort') >= 0){
				listSort = target;
			}
			else if (thiz.attr('class').indexOf('filter') >= 0){

				var thizCate = thiz.data('cate');

				for (var i = 0;i < filterArry.length;i ++){

					if (filterArry[i].indexOf(thizCate) >= 0){

						filterArry.splice(i, 1);

					}

				}

				filterArry.push(target);

				pageFilter = filterArry.join(',');

			}
			else{
				listCate = target;
			}

			$('.video-list').css('opacity', '0.3');

			if (!isNaN(appVersion) && appVersion>3.2){
	            jsToOC.send('showhud');
	        }

			getList();

		});
    }

    //滚动获取
    function handleScroll() {
    	
		var top = $('.video-list').scrollTop();
        
        var closeToBottom = (listHeightCurrent - (top + appConfig.screenHeight) <= newHeight/2);

        if (closeToBottom) {

        	// jsToOC.send('showhud');
        	

        	$('.list-con').append(loading.init());

        	$('.video-list').off('scroll', handleScroll);

            getList();
        }
        
    }

    //跳转详情页
    function showDetails(){
    	$('.pageView').on(appConfig.clickEvent, '.video-item', function(){

    		var url;

	        if (appConfig.isLocal) {
	            url = 'http://192.168.2.104/static/client/src/html/detail.html'
	        }
	        else {
	            url = appConfig.webDomain + '/video/detail';
	        }

	        var data = $(this).data();

	        localStore.set(data);
	        
	        if (!isNaN(appVersion) && appVersion>=3.6){

	        	OpenPage({
		            url: url + '?video_id=' + data.videoId + '&video_name=' + data.name,
		            t:  data['name'],
		            tbh: true,
		            pdr: false,

		            pcf: true,

		            rb: {
		                t: '1',
		                v: 'share'
		            }

                    //展示banner
                    ,ban: {
                        i: 2,
                        p: 2
                    }
		            // ahl: false
		        });

	        }else{

	        	OpenPage({
		            url: url + '?video_id=' + data.videoId + '&video_name=' + data.name,
		            t:  data['name'],
		            tbh: true,
		            pdr: false,

		            pcf: true

                    //展示banner
                    ,ban: {
                        i: 2,
                        p: 2
                    }

		            // rb: {
		            //     t: '1',
		            //     v: 'share'
		            // }
		            // ahl: false
		        });

	        }

    	});
    }

    //点击更多
    function listMore () {

    	$('.pageView').on(appConfig.clickEvent, '#list_more_btn', function(){

    		var thiz = $(this),
    			target = thiz.data('target'),
    			title = thiz.data('title'),
    			url = '';

    		if (appConfig.isLocal) {
	            url = 'http://10.88.0.110/hd-v3/server-v3/static/client/src/html/list.html';
	        }
	        else {
	            url = appConfig.apiDomain + '/video/channel/' + target + '/list';
	        }

	        if (!isNaN(appVersion) && appVersion<3.2){
	            OpenPage({
	                url: url + '?cate_alias=' + target + '&from=list',
	                t:  title,
	                tbh: true,
	                pdr: false,
	                // ahl: false,
	                rbt: 1,
	                rbv: 'panel',
	                ck: 1
	            });
	        }
	        else if (!isNaN(appVersion) && appVersion==3.2){
	            OpenPage({
	                url: url + '?cate_alias=' + target + '&from=list',
	                t:  title,
	                tbh: true,
	                pdr: false,
	                // ahl: false,
	                rb: {
	                    t: '1',
	                    v: 'panel'
	                },
	                ck: 1
	            });
	        }
	        else{
	            OpenPage({
	                url: url + '?cate_alias=' + target + '&from=list',
	                t:  title,
	                tbh: true,
	                pdr: false,
	                ahl: false,
	                rb: {
	                    t: '1',
	                    v: 'panel'
	                },
	                ck: 1
	            });
	        }

    	})

    }

	$(function() {

		var debug = getUrlParam('debug'),
			cookieDevice = $.cookie('xy_d_model');
		
		listCate = channel_id;

		if (cookieDevice && cookieDevice.indexOf('iPad') >= 0){
            showCount = 30;
        }

		//模拟APP
		if (debug == 1){
			simulate();
		}

		viewPtop = $('.navigationBar').length > 0 ? $('.navigationBar').height(): 0;

		getList();

		panelAction();

		reGetList();

		// handleScroll();

		showDetails();

		listMore();

    });


});