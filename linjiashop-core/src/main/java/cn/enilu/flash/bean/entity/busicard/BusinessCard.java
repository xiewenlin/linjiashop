package cn.enilu.flash.bean.entity.busicard;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.Table;
import org.hibernate.validator.constraints.NotBlank;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

/**
 * @description:
 * @program: linjiashop
 * @author: Jack Leon
 * @date: 2020-09-28 11:42
 **/
@Data
@Entity(name="t_business_card")
@Table(appliesTo = "t_business_card",comment = "我的名片")
public class BusinessCard extends BaseEntity {
    private  Long  id;  //主键ID
    @Column(columnDefinition = "VARCHAR(64) COMMENT '姓名'")
    private  String  name;  //姓名
    @Column(columnDefinition = "VARCHAR(100) COMMENT '公司名称'")
    private  String  company;  //公司名称
    @Column(columnDefinition = "VARCHAR(20) COMMENT '电话'")
    private  String  phone;  //电话
    @Column(columnDefinition = "VARCHAR(50) COMMENT '邮箱'")
    private  String  email;  //邮箱
    @Column(columnDefinition = "VARCHAR(200) COMMENT '地址'")
    private  String  address;  //地址
    @Column(columnDefinition = "VARCHAR(200) COMMENT '网址'")
    private  String  website;  //网址
    @Column(columnDefinition = "VARCHAR(64) COMMENT '职位'")
    private  String  position;  //职位
    @Column(columnDefinition = "VARCHAR(5000) COMMENT '业务介绍'")
    private  String  description;  //我能提供的价值
    @Column(columnDefinition = "VARCHAR(500) COMMENT '二维码'")
    private  String  qrcode;  //二维码
    @Column(columnDefinition = "VARCHAR(200) COMMENT '备注'")
    private  String  memo;  //备注
    @Column(columnDefinition = "BIGINT COMMENT '用户ID'")
    private  Long  userid;  //用户ID
    @Column(columnDefinition = "BIGINT COMMENT '公司ID'")
    private  Long  orgid;  //公司ID
    @Column(name="template_id",columnDefinition = "VARCHAR(64) COMMENT '模板ID'")
    private  Long templateId;  //模板ID
    @Column(name="template_content",columnDefinition = "TEXT COMMENT '模板内容'")
    private String templateContent;//模板内容
    @Column(columnDefinition = "VARCHAR(500) COMMENT '公司logo'")
    private  String  logo;  //公司logo



}
