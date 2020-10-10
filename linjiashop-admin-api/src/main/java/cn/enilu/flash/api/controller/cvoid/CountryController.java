package cn.enilu.flash.api.controller.cvoid;

import cn.enilu.flash.bean.constant.factory.PageFactory;
import cn.enilu.flash.bean.entity.covid.Country;
import cn.enilu.flash.bean.vo.front.Rets;
import cn.enilu.flash.service.cvoid.CountryService;
import cn.enilu.flash.utils.factory.Page;
import cn.enilu.flash.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * @description:
 * @program: linjiashop
 * @author: Jack Leon
 * @date: 2020-09-27 14:02
 **/
@RestController
@RequestMapping("/covid/country")
public class CountryController extends BaseController {
    @Autowired
    private CountryService countryService;

    @RequestMapping(value="list",method = RequestMethod.GET)
    public  Object list(){
        Page<Country> page = new PageFactory<Country>().defaultPage();
        page=countryService.queryPage(page);
        return Rets.success(page);
    }

    @RequestMapping(method = RequestMethod.POST)
    public Object save(@ModelAttribute Country country){
        if(country.getId()==null){
            countryService.insert(country);
        }else{
            countryService.update(country);
        }
        return Rets.success();
    }
    @RequestMapping(method = RequestMethod.DELETE)
    public  Object remove(Long id){
        countryService.deleteById(id);
        return Rets.success();
    }

}
