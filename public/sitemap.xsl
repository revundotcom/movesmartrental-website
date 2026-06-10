<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>
<xsl:template match="/">
<html><head><title>MoveSmart Rentals &#8212; XML Sitemap</title>
<meta name="robots" content="noindex,nofollow"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;color:#16202b;background:#f4f7f6}
.hero{background:linear-gradient(135deg,#0B1D3A,#10324f);color:#fff;padding:46px 7vw 34px}
.hero .eyebrow{font-size:11px;letter-spacing:4px;text-transform:uppercase;color:#34d99c;font-weight:700;margin-bottom:14px}
.hero h1{font-family:Georgia,serif;font-size:34px;font-weight:700}
.hero p{margin-top:10px;color:rgba(255,255,255,.7);font-size:14px}
.wrap{max-width:1080px;margin:0 auto;padding:34px 7vw 70px}
table{width:100%;border-collapse:collapse;background:#fff;border:1px solid #e7ecef;border-radius:12px;overflow:hidden}
th{text-align:left;font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#fff;background:#0B1D3A;padding:13px 18px}
td{padding:12px 18px;border-bottom:1px solid #f0f3f5;font-size:14px}
tr:hover td{background:#f7faf9}
a{color:#0c7a52;text-decoration:none;font-weight:600}
a:hover{text-decoration:underline}
.muted{color:#9aa6b2;font-size:13px}
.count{font-variant-numeric:tabular-nums;color:#0B1D3A;font-weight:700}
.foot{max-width:1080px;margin:0 auto;padding:0 7vw 40px;color:#9aa6b2;font-size:12px}
</style></head>
<body>
<div class="hero">
  <div class="eyebrow">MoveSmart Rentals</div>
  <h1>XML Sitemap</h1>
  <p>Generated for search engines and organized by content type.</p>
</div>
<div class="wrap"><xsl:apply-templates/></div>
<div class="foot">movesmartrentals.com &#183; organized XML sitemap</div>
</body></html>
</xsl:template>

<xsl:template match="s:sitemapindex">
  <table>
    <tr><th>Sitemap</th><th>Last updated</th></tr>
    <xsl:for-each select="s:sitemap">
      <tr>
        <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
        <td class="muted"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
      </tr>
    </xsl:for-each>
  </table>
</xsl:template>

<xsl:template match="s:urlset">
  <p class="muted" style="margin-bottom:14px"><span class="count"><xsl:value-of select="count(s:url)"/></span> URLs</p>
  <table>
    <tr><th>URL</th><th>Priority</th><th>Change</th><th>Last updated</th></tr>
    <xsl:for-each select="s:url">
      <tr>
        <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
        <td class="muted"><xsl:value-of select="s:priority"/></td>
        <td class="muted"><xsl:value-of select="s:changefreq"/></td>
        <td class="muted"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
      </tr>
    </xsl:for-each>
  </table>
</xsl:template>
</xsl:stylesheet>
