---
title: "Katsevich Lab - Software"
layout: default
excerpt: "Katsevich -- Software"
sitemap: false
permalink: /software/
---

# Software

{% assign number_printed = 0 %}
{% for software in site.data.software %}

{% assign even_odd = number_printed | modulo: 2 %}

{% if even_odd == 0 %}
<div class="row">
{% endif %}

<div class="col-sm-6 clearfix">
  <img src="{{ site.url }}{{ site.baseurl }}/images/softwarepic/{{ software.logo }}" class="img-responsive" width="25%" style="float: left" />
  <h4>{{ software.name }}</h4>
  <i>{{ software.blurb }}</i>
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