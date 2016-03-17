using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using kwtwsite.Models;
using System.Web.Mvc.Ajax;


namespace kwtwsite.Controllers
{
    public class HomeController : Controller
    {
        DataRepo datarepo = new DataRepo();
        private DataClasses1DataContext db = new DataClasses1DataContext();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Front()
        {
            return View();
        }

        public ActionResult Social()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Beta()
        {
            ViewBag.Message = "Your application description page.";
            var DataContext = new DataClasses1DataContext();
            var data = from u in DataContext.Users
                       select u;

            return View("Beta", data);
        }


        public void SaveUser(string firstname, string lastname, int StravaID, int NumAct, int NumSeg)
        {
            
            var DataContext = new DataClasses1DataContext();
           

        var userct = from u in DataContext.Users
                         where u.StravaID == StravaID
                         select u;

            if (userct.Count() > 0) {
                //update
                var sc = db.Users
                .Where(s => s.StravaID == StravaID)
                .First();

                sc.Activities = NumAct;
                sc.Segments = NumSeg;
                db.SubmitChanges();


            }
            else
            {
                //save new
                User unew = new Models.User();
                unew.Firstname = firstname;
                unew.Lastname = lastname;
                unew.StravaID = StravaID;
                unew.Activities = NumAct;
                unew.Segments = NumSeg;

                datarepo.Add(unew);
                datarepo.Save();


            }
            

           
        }

        public void SaveSegment(string segname, int segID, string array, string polyline, string latlng)
        {

            var DataContext = new DataClasses1DataContext();


            var segct = from u in DataContext.Segments
                         where u.SegmentID == segID
                         select u;

            if (segct.Count() > 0)
            {
                //update
              
            }
            else
            {
                //save new
                Segment segnew = new Models.Segment();
                segnew.SegmentID = segID;
                segnew.SegmentName = segname;
                segnew.BearingArray = array;
                segnew.Polyline = polyline;
                segnew.latlng = latlng;

                datarepo.Add(segnew);
                datarepo.Save();


            }



        }

    }
}