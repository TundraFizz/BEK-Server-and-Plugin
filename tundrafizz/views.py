from pyramid.view import view_config


# Index
@view_config(route_name="index", renderer="index.jinja2")
def index(request):
    return {"": ""}


# About
@view_config(route_name="about",    renderer="about/placeholder-1.jinja2")
@view_config(route_name="about-p1", renderer="about/placeholder-1.jinja2")
def about(request):
    return {"": ""}

@view_config(route_name="about-p2", renderer="about/placeholder-2.jinja2")
def about_p2(request):
    return {"": ""}

@view_config(route_name="about-p3", renderer="about/placeholder-3.jinja2")
def about_p3(request):
    return {"": ""}


# Pax
@view_config(route_name="pax",      renderer="pax/info.jinja2")
@view_config(route_name="pax-info", renderer="pax/info.jinja2")
def pax_info(request):
    return {"": ""}

@view_config(route_name="pax-roster", renderer="pax/roster.jinja2")
def pax_roster(request):
    return {"": ""}

@view_config(route_name="pax-hotel-chart", renderer="pax/hotel-chart.jinja2")
def pax_hotel_chart(request):
    return {"": ""}

# Fek
@view_config(route_name="fek",         renderer="fek/account.jinja2")
@view_config(route_name="fek-account", renderer="fek/account.jinja2")
def fek_account(request):
    return {"": ""}

@view_config(route_name="fek-events", renderer="fek/events.jinja2")
def fek_events(request):
    return {"": ""}

@view_config(route_name="fek-fish-chips", renderer="fek/fish-chips.jinja2")
def fek_fish_chips(request):
    return {"": ""}

@view_config(route_name="fek-badge-and-title", renderer="fek/badge-and-title.jinja2")
def fek_badge_and_title(request):
    return {"": ""}

# Projects
@view_config(route_name="projects",                 renderer="projects/riot-randomizer.jinja2")
@view_config(route_name="projects-riot-randomizer", renderer="projects/riot-randomizer.jinja2")
def projects_riot_randomizer(request):
    return {"": ""}

@view_config(route_name="projects-p2", renderer="projects/placeholder-2.jinja2")
def projects_p2(request):
    return {"": ""}

@view_config(route_name="projects-p3", renderer="projects/placeholder-3.jinja2")
def projects_p3(request):
    return {"": ""}
