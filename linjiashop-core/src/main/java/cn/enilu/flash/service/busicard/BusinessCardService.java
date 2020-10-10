package cn.enilu.flash.service.busicard;


import cn.enilu.flash.bean.entity.busicard.BusinessCard;
import cn.enilu.flash.dao.busicard.BusinessCardRepository;

import cn.enilu.flash.service.BaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BusinessCardService extends BaseService<BusinessCard,Long,BusinessCardRepository>  {
    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private BusinessCardRepository businessCardRepository;

}

