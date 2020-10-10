package cn.enilu.flash.bean.entity.covid;

import cn.enilu.flash.bean.entity.BaseEntity;
import lombok.Data;
import org.hibernate.annotations.Table;

import javax.persistence.Column;
import javax.persistence.Entity;

/**
 * @description: ${description}
 * @program: linjiashop
 * @author: Jack Leon
 * @date: 2020-09-27 13:37
 **/
@Data
@Entity(name="t_covid_country")
@Table(appliesTo = "t_covid_country",comment = "新冠肺炎国家病例分布")
public class Country extends BaseEntity{
    @Column(columnDefinition = "VARCHAR(64) COMMENT '名称'")
    private String name;
    @Column(columnDefinition = "INT COMMENT '累计确诊人数'")
    private Integer count;
    @Column(columnDefinition = "INT COMMENT '累计死亡人数'")
    private Integer deadCount;

}
