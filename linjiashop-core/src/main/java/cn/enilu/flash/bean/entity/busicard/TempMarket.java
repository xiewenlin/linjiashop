package cn.enilu.flash.bean.entity.busicard;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;

import javax.persistence.Column;
import javax.persistence.Entity;
/**
 * @description:
 * @program: linjiashop
 * @author: Jack Leon
 * @date: 2020-10-19 12:11
 **/
@Data
@Entity(name="t_business_card_market")
@Table(appliesTo = "t_business_card_market",comment = "名片市场")
public class TempMarket  extends BaseEntity {
    private  Long  id;  //模板ID
    @Column(name="temp_name",columnDefinition = "VARCHAR(64) COMMENT '模板名称'")
    private  String  tempName;
    @Column(name="temp_desc",columnDefinition = "VARCHAR(255) COMMENT '详细描述'")
    private  String  tempDesc;
    @Column(name="pre_front_image_url",columnDefinition = "VARCHAR(500) COMMENT '正面预览缩略图'")
    private  String  preFrontImageUrl;
    @Column(name="pre_back_image_url",columnDefinition = "VARCHAR(500) COMMENT '反面预览缩略图'")
    private  String  preBackImageUrl;
    @Column(name="front_image_url",columnDefinition = "VARCHAR(500) COMMENT '正面背景图'")
    private  String  frontImageUrl;
    @Column(name="back_image_url",columnDefinition = "VARCHAR(500) COMMENT '反面背景图'")
    private  String  backImageUrl;
    @Column(name="front_text_color",columnDefinition = "VARCHAR(50) COMMENT '正面文字颜色'")
    private  String  frontTextColor;
    @Column(name="back_text_color",columnDefinition = "VARCHAR(50) COMMENT '反面文字颜色'")
    private  String  backTextColor;
    @Column(name="front_location_style",columnDefinition = "VARCHAR(50) COMMENT '正面位置风格'")
    private  String  frontLocationStyle;
    @Column(name="back_location_style",columnDefinition = "VARCHAR(50) COMMENT '反面位置风格'")
    private  String  backLocationStyle;
    @Column(name="temp_tag",columnDefinition = "VARCHAR(500) COMMENT '标签'")
    private  String  tempTag;
    @Column(name="template_industry",columnDefinition = "VARCHAR(50) COMMENT '行业'")
    private  String  templateIndustry;
    @Column(columnDefinition = "VARCHAR(50) COMMENT '是否推荐'")
    private  String  recommend;
    @Column(columnDefinition = "VARCHAR(50) COMMENT '星级'")
    private  String  stars;
    @Column(name="temp_code",columnDefinition = "TEXT COMMENT '模板代码'")
    private  String  tempCode;
    @Column(name="temp_price",columnDefinition = "VARCHAR(50) COMMENT '价格'")
    private  Long templateId;
    @Column(name="src_flag",columnDefinition = "VARCHAR(50) COMMENT '切换正反面参数'")
    private String srcFlag;
}
