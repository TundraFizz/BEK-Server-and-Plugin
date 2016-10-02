from pyramid.config import Configurator
from .utilities.a import RemoveTrailingSlashes


def main(global_config, **settings):
    config = Configurator(settings=settings)
    
    config.include("pyramid_jinja2")

    config.add_static_view("resources", "resources")
    config.add_static_view("static", "static")
    config.add_static_view("qwe", "qwe")
    config.add_static_view(".well-known/acme-challenge", "/home/ec2-user/tundrafizz/tundrafizz/.well-known/acme-challenge")

    config.add_jinja2_search_path("templates")

    config.add_route("index", "")

    config.add_route("about",    "about")
    config.add_route("about-p1", "about-placeholder-1")
    config.add_route("about-p2", "about-placeholder-2")
    config.add_route("about-p3", "about-placeholder-3")

    config.add_route("pax",             "pax")
    config.add_route("pax-info",        "pax-info")
    config.add_route("pax-roster",      "pax-roster")
    config.add_route("pax-hotel-chart", "pax-hotel-chart")

    config.add_route("fek",                 "fek")
    config.add_route("fek-account",         "fek-account")
    config.add_route("fek-events",          "fek-events")
    config.add_route("fek-fish-chips",      "fek-fish-chips")
    config.add_route("fek-badge-and-title", "fek-badge-and-title")

    config.add_route("projects",                 "projects")
    config.add_route("projects-riot-randomizer", "projects-riot-randomizer")
    config.add_route("projects-p2",              "projects-placeholder-2")
    config.add_route("projects-p3",              "projects-placeholder-3")

    config.add_notfound_view(RemoveTrailingSlashes())
    config.scan()
    return config.make_wsgi_app()
