---
title: "Katsevich Lab - Software"
layout: gridlay
excerpt: "Katsevich -- Software"
sitemap: false
permalink: /software/
---

# Software

<div class="row">
  <div class="col-sm-6 clearfix">
    <a href="https://katsevich-lab.github.io/sceptre/">
      <img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" style="width:100px;margin:0px 10px">
    </a> 
  </div>
  <div class="col-sm-6 clearfix">
    <a href="https://katsevich-lab.github.io/sceptre/">
      <img src="{{ site.url }}{{ site.baseurl }}/images/ondisc-hex-annotated.png" style="width:100px;margin:0px 10px">
    </a> 
  </div>
</div>

<div class="row">
  <div class="col-sm-6 clearfix">
    <img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" style="width:100px;margin:0px 10px">
  </div>
  <div class="col-sm-6 clearfix">
    <img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" style="width:100px;margin:0px 10px">
  </div>
</div>

<div class="row">
  <div class="col-sm-6 clearfix">
    <img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" class="img-responsive" width="25%" style="float: left" />
  </div>
  <div class="col-sm-6 clearfix">
    <img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" class="img-responsive" width="25%" style="float: left" />
  </div>
</div>

<p style="text-align:center;">
<a href="https://katsevich-lab.github.io/sceptre/">
<img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" style="width:100px;margin:0px 10px">
</a>  
<a href="https://timothy-barry.github.io/ondisc/">
  <img src="{{ site.url }}{{ site.baseurl }}/images/ondisc-hex-annotated.png" style="width:100px;margin:0px 10px">
</a>  
</p>

<p style="text-align:center;">
  <img src="{{ site.url }}{{ site.baseurl }}/images/sceptre-hex-annotated.png" style="width:100px;margin:0px 10px">
  <img src="{{ site.url }}{{ site.baseurl }}/images/ondisc-hex-annotated.png" style="width:100px;margin:0px 10px">
</p>



<p style="text-align:center;">
  <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/nsf-logo.png" style="height:110px;margin:0px 50px">
  <img src="{{ site.url }}{{ site.baseurl }}/images/logopic/wharton_analytics.png" style="height:80px;margin:0px 50px">
</p>

{% assign number_printed = 0 %}
{% for member in site.data.team_members %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/teampic/{{ member.photo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ member.name }}</h4>
  <i>{{ member.info }} <!--<br>email: <{{ member.email }}></i> -->
  <ul style="overflow: hidden">

  {% if member.number_educ == 1 %}
  <li> {{ member.education1 }} </li>
  {% endif %}

  {% if member.number_educ == 2 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  {% endif %}

  {% if member.number_educ == 3 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  {% endif %}

  {% if member.number_educ == 4 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  {% endif %}

  {% if member.number_educ == 5 %}
  <li> {{ member.education1 }} </li>
  <li> {{ member.education2 }} </li>
  <li> {{ member.education3 }} </li>
  <li> {{ member.education4 }} </li>
  <li> {{ member.education5 }} </li>
  {% endif %}

  </ul>
</div>

{% assign number_printed = number_printed | plus: 1 %}

{% if even_odd == 1 %}
</div>
{% endif %}

{% endfor %}

{% assign even_odd = number_printed | modulo: 2 %}
{% if even_odd == 1 %}
</div>
{% endif %}