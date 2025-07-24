using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;

namespace YourProject.Controllers
{
    /// <summary>
    /// Home controller for managing the main website pages and navigation
    /// </summary>
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Displays the main homepage with all components and data
        /// </summary>
        /// <returns>Homepage view with component data</returns>
        public IActionResult Index()
        {
            // Initialize data for homepage components
            // This data would typically come from your database or services

            // Homepage featured services for the slider component
            ViewBag.FeaturedServices = new[]
            {
                new
                {
                    id = 1,
                    title = "خدمة الأمن السيبراني",
                    description = "حلول شاملة لأمن المعلومات والحماية الرقمية",
                    icon = "bi-shield-check",
                    url = "/Services/cybersecurity",
                    category = "تقنية",
                    isActive = true,
                    featured = true
                },
                new
                {
                    id = 2,
                    title = "الاستشارات الإدارية",
                    description = "خدمات استشارية متخصصة في التطوير الإداري",
                    icon = "bi-briefcase",
                    url = "/Services/consultation",
                    category = "إدارية",
                    isActive = true,
                    featured = true
                },
                new
                {
                    id = 3,
                    title = "التدريب والتطوير",
                    description = "برامج تدريبية متقدمة لتنمية المهارات",
                    icon = "bi-mortarboard",
                    url = "/Services/training",
                    category = "تدريب",
                    isActive = true,
                    featured = true
                },
                new
                {
                    id = 4,
                    title = "علامة تبويب عنوان الخدمة",
                    description = "علامة تبويب وصف مختصر للخدمة",
                    icon = "icon-placeholder",
                    url = "/Services/placeholder",
                    category = "علامة تبويب فئة",
                    isActive = true,
                    featured = true
                }
            };

            // Organization departments and divisions
            ViewBag.Sectors = new[]
            {
                new
                {
                    id = 1,
                    name = "قسم تكنولوجيا المعلومات",
                    nameEn = "Information Technology",
                    description = "إدارة وتطوير الأنظمة التقنية والمعلوماتية",
                    icon = "bi-laptop",
                    url = "/Sectors/it",
                    serviceCount = 15,
                    isActive = true
                },
                new
                {
                    id = 2,
                    name = "قسم الموارد البشرية",
                    nameEn = "Human Resources",
                    description = "إدارة شؤون الموظفين والتطوير المهني",
                    icon = "bi-people",
                    url = "/Sectors/hr",
                    serviceCount = 12,
                    isActive = true
                },
                new
                {
                    id = 3,
                    name = "قسم الشؤون المالية",
                    nameEn = "Financial Affairs",
                    description = "إدارة الميزانيات والمعاملات المالية",
                    icon = "bi-currency-dollar",
                    url = "/Sectors/finance",
                    serviceCount = 8,
                    isActive = true
                },
                new
                {
                    id = 4,
                    name = "قسم خدمة العملاء",
                    nameEn = "Customer Service",
                    description = "تقديم الدعم والمساعدة للمستفيدين",
                    icon = "bi-headset",
                    url = "/Sectors/customer-service",
                    serviceCount = 20,
                    isActive = true
                },
                new
                {
                    id = 5,
                    name = "قسم الأمن والسلامة",
                    nameEn = "Security and Safety",
                    description = "ضمان الأمن والسلامة في البيئة المؤسسية",
                    icon = "bi-shield-check",
                    url = "/Sectors/security",
                    serviceCount = 6,
                    isActive = true
                },
                new
                {
                    id = 6,
                    name = "قسم التدريب والتطوير",
                    nameEn = "Training and Development",
                    description = "برامج التدريب وتطوير القدرات",
                    icon = "bi-mortarboard",
                    url = "/Sectors/training",
                    serviceCount = 14,
                    isActive = true
                },
                new
                {
                    id = 7,
                    name = "قسم العلاقات العامة",
                    nameEn = "Public Relations",
                    description = "إدارة التواصل والعلاقات مع الجمهور",
                    icon = "bi-megaphone",
                    url = "/Sectors/public-relations",
                    serviceCount = 9,
                    isActive = true
                },
                new
                {
                    id = 8,
                    name = "قسم الجودة والتطوير",
                    nameEn = "Quality and Development",
                    description = "ضمان الجودة وتطوير العمليات",
                    icon = "bi-award",
                    url = "/Sectors/quality",
                    serviceCount = 11,
                    isActive = true
                }
            };

            // Statistics Data for StatsSection component
            ViewBag.Stats = new[]
            {
                new
                {
                    title = "المستخدمون النشطون",
                    value = "25,000+",
                    icon = "bi-people",
                    description = "عدد المستخدمين المسجلين والفعالين",
                    change = "+12%",
                    trend = "up"
                },
                new
                {
                    title = "الخدمات المتاحة",
                    value = "150+",
                    icon = "bi-gear",
                    description = "إجمالي الخدمات الإلكترونية المقدمة",
                    change = "+8%",
                    trend = "up"
                },
                new
                {
                    title = "المعاملات المنجزة",
                    value = "500,000+",
                    icon = "bi-check-circle",
                    description = "عدد المعاملات المنجزة بنجاح",
                    change = "+15%",
                    trend = "up"
                },
                new
                {
                    title = "مستوى الرضا",
                    value = "98%",
                    icon = "bi-star",
                    description = "نسبة رضا المستخدمين عن الخدمات",
                    change = "+3%",
                    trend = "up"
                }
            };

            // News Data for NewsSection component
            ViewBag.News = new[]
            {
                new
                {
                    id = 1,
                    title = "علامة تبويب عنوان الخبر",
                    summary = "علامة تبويب ملخص الخبر",
                    content = "علامة تبويب النص الكامل للخبر...",
                    image = "/images/placeholder.jpg",
                    publishDate = DateTime.Now.AddDays(-2),
                    author = "علامة تبويب الكاتب",
                    category = "علامة تبويب الفئة",
                    isImportant = true,
                    url = "/News/placeholder"
                },
                new
                {
                    id = 2,
                    title = "علامة تبويب عنوان الخبر",
                    summary = "علامة تبويب ملخص الخبر",
                    content = "علامة تبويب النص الكامل للخبر...",
                    image = "/images/placeholder.jpg",
                    publishDate = DateTime.Now.AddDays(-5),
                    author = "علامة تبويب الكاتب",
                    category = "علامة تبويب الفئة",
                    isImportant = false,
                    url = "/News/placeholder"
                },
                new
                {
                    id = 3,
                    title = "علامة تبويب عنوان الخبر",
                    summary = "علامة تبويب ملخص الخبر",
                    content = "علامة تبويب النص الكامل للخبر...",
                    image = "/images/placeholder.jpg",
                    publishDate = DateTime.Now.AddDays(-7),
                    author = "علامة تبويب الكاتب",
                    category = "علامة تبويب الفئة",
                    isImportant = false,
                    url = "/News/placeholder"
                }
            };

            // Last updated timestamp for cache busting
            ViewBag.LastUpdated = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");

            // Page metadata
            ViewData["Title"] = "علامة تبويب عنوان الصفحة";
            ViewData["Description"] = "علامة تبويب وصف الموقع - علامة تبويب الوصف التفصيلي";
            ViewData["Keywords"] = "علامة تبويب الكلمات المفتاحية, علامة تبويب كلمة, علامة تبويب كلمة";

            return View();
        }

        /// <summary>
        /// Privacy page
        /// </summary>
        /// <returns>Privacy policy view</returns>
        public IActionResult Privacy()
        {
            ViewData["Title"] = "علامة تبويب عنوان الصفحة";
            return View();
        }

        /// <summary>
        /// Contact page
        /// </summary>
        /// <returns>Contact us view</returns>
        public IActionResult Contact()
        {
            ViewData["Title"] = "علامة تبويب عنوان الصفحة";
            return View();
        }

        /// <summary>
        /// About page
        /// </summary>
        /// <returns>About us view</returns>
        public IActionResult About()
        {
            ViewData["Title"] = "علامة تبويب عنوان الصفحة";
            return View();
        }

        /// <summary>
        /// Error handling
        /// </summary>
        /// <returns>Error view</returns>
        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel 
            { 
                RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier 
            });
        }
    }

    /// <summary>
    /// Error view model
    /// </summary>
    public class ErrorViewModel
    {
        public string? RequestId { get; set; }
        public bool ShowRequestId => !string.IsNullOrEmpty(RequestId);
    }
}
