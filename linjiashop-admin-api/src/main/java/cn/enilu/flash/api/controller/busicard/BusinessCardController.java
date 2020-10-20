package cn.enilu.flash.api.controller.busicard;

import cn.enilu.flash.bean.entity.busicard.BusinessCard;
import cn.enilu.flash.bean.exception.ApplicationExceptionEnum;
import cn.enilu.flash.bean.vo.query.SearchFilter;
import cn.enilu.flash.service.busicard.BusinessCardService;

import cn.enilu.flash.bean.core.BussinessLog;
import cn.enilu.flash.bean.constant.factory.PageFactory;
import cn.enilu.flash.bean.exception.ApplicationException;
import cn.enilu.flash.bean.vo.front.Rets;

import cn.enilu.flash.utils.HttpUtil;
import cn.enilu.flash.utils.StringUtil;
import cn.enilu.flash.utils.factory.Page;

import cn.enilu.flash.web.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/business/card")
public class BusinessCardController extends BaseController {
	private  Logger logger = LoggerFactory.getLogger(getClass());
	@Autowired
	private BusinessCardService businessCardService;

	@RequestMapping(value = "/list",method = RequestMethod.GET)
	public Object list() {
		HttpServletRequest request = HttpUtil.getRequest();
		Long idUser = getIdUser(request);
	Page<BusinessCard> page = new PageFactory<BusinessCard>().defaultPage();
		page.addFilter("userid", SearchFilter.Operator.EQ,idUser);
		page = businessCardService.queryPage(page);
		return Rets.success(page);
	}
	@RequestMapping(method = RequestMethod.POST)
	@BussinessLog(value = "编辑名片设计", key = "name")
	public Object save(@ModelAttribute BusinessCard businessCard){
		if(null==businessCard.getUserid()||StringUtil.isEmpty(businessCard.getUserid())){
			HttpServletRequest request = HttpUtil.getRequest();
			Long idUser = getIdUser(request);
			businessCard.setUserid(idUser);
		}

		if(businessCard.getId()==null){
			businessCardService.insert(businessCard);
		}else {
			businessCardService.update(businessCard);
		}
		return Rets.success(businessCard);
	}
	@RequestMapping(method = RequestMethod.DELETE)
	@BussinessLog(value = "删除名片设计", key = "id")
	public Object remove(Long id){
		if (StringUtil.isEmpty(id)) {
			throw new ApplicationException(ApplicationExceptionEnum.REQUEST_NULL);
		}
		businessCardService.deleteById(id);
		return Rets.success();
	}
}
