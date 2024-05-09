import webapp2
import os
import urllib
from google.appengine.ext.webapp import template


class MainPage(webapp2.RequestHandler):
    def get(self):
        path = os.path.join(os.path.dirname(_file_), "index.html")
        context = {}
        self.response.out.write(template.render(path, context))


    def post(self):
        pincode = self.request.get("zipCode")
        url = "https://api.postalpincode.in/pincode/" + pincode
        data = urllib.urlopen(url).read()
        post_office = data[0]['PostOffice'][0]['State']
        name = data[0]['PostOffice'][0]['Name']
        block = data[0]['PostOffice'][0]['Block']
        district = data[0]['PostOffice'][0]['District']

        template_values = {
            "post_office":post_office 
            "name":name
            "block":block
            "district":district
        }

        path = os.path.join(os.path.dirname(_file_), :"results.html")
        self.response.out.write(template.render(path, template_values))


app = webapp2.WSGIApplication([('/', MainPage)], debug=True)