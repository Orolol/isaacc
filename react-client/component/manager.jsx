import React                        from 'react';
import {Link, hashHistory, router}  from 'react-router';
import {translate}                  from 'react-i18next';


class ModuleManager extends React.Component {
    constructor() {
        super();
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.showViewManager = this.showViewManager.bind(this);
        this.hideViewManager = this.hideViewManager.bind(this);
        this.state = {
            showForm: false,
            showMenu: false,
            showViewManager: false,
        };
    }

    componentDidMount(){
        ViewParametersStore.updateMetricsList();
    }

    handleDateChange(start_date, end_date) {
        CalendarStore.updateRangeDate(start_date, end_date);
    }

    showForm() {
        this.setState({showForm: true})
        this.setState({showViewManager: false})
    }
    hideForm() {
        this.setState({showForm: false})
    }
    showMenu() {
        this.setState({showMenu: true})
    }
    hideMenu() {
        this.setState({showMenu: false})
    }
    showViewManager() {
        this.setState({showViewManager: true})
        this.setState({showForm: false})
    }
    hideViewManager() {
        this.setState({showViewManager: false})
    }

    render() {
        const {t} = this.props;
        let dateFormatOutput = t('common:dateFormat');
        let dateFormatDisplay = t('common:dateFormat');

        let handleDateChange = this.handleDateChange;
        let renderModule,
            cmTabClassName,
            clTabClassName,
            cmLink,
            clLink,
            renderForm;
        let activeModule = this.context.params.module;
        let account_id = this.context.params.account;
        let project = this.props.location.query.project;

        let projectManagerLink = {
            pathname: "/" + account_id + "/projectmanager/"
        };
        let campaignManagerLink = {
            pathname: "/" + account_id + "/campaignmanager/"
        };
        let dashboardManagerLink = {
            pathname: "/" + account_id + "/dashboardmanager/"
        };
        let conversionManagerLink = {
            pathname: "/" + account_id + "/conversionmanager/"
        };
        let siteofferManagerLink = {
            pathname: "/" + account_id + "/siteoffermanager/"
        };
        let insertionManagerLink = {
            pathname: "/" + account_id + "/insertionmanager/"
        };
        let creativeManagerLink = {
            pathname: "/" + account_id + "/creativemanager/"
        };
        let reportManagerLink = {
            pathname: "/" + account_id + "/reportmanager/"
        };



        if (activeModule === undefined) {
            renderModule = '';
        } else if (activeModule === 'projectmanager' && /^r/.test(this.context.access.campaign_access)) {
            let projectSelected = BreadcrumbStore.getSelectedProjects();
            // var createChildren = function(){
            //      browserHistory.push('../campaignmanager/');
            //      this.showForm();
            // }

            renderModule = <ProjectManager  projectSelected={projectSelected} addAction={this.showForm} viewManager={this.showViewManager}/>;
            renderForm = <ProjectForm closeAction={this.hideForm} projectSelected={projectSelected}/>;

        } else if (activeModule === 'campaignmanager' && /^r/.test(this.context.access.campaign_access)) {
            let campaignSelected = BreadcrumbStore.getSelectedCampaigns();
            renderModule = <CampaignManager campaignSelected={campaignSelected} addAction={this.showForm} viewManager={this.showViewManager} />;
            renderForm = <CampaignForm campaignSelected={campaignSelected} closeAction={this.hideForm}/>;

        } else if (activeModule === 'creativemanager' && /^r/.test(this.context.access.creative_access)) {
            let projectSelected = BreadcrumbStore.getSelectedProjects();
            renderModule =  <CreativeManager addAction={this.showForm} viewManager={this.showViewManager}/>;

        } else if (activeModule === 'siteoffermanager' && /^r/.test(this.context.access.campaign_access)) {
            let campaignSelected = BreadcrumbStore.getSelectedCampaigns();
            renderModule = <SiteOfferManager campaignSelected={campaignSelected} addAction={this.showForm} viewManager={this.showViewManager}/>;
            renderForm = <SiteOfferForm closeAction={this.hideForm}/>;

        } else if (activeModule === 'insertionmanager' && /^r/.test(this.context.access.campaign_access)) {
            let insertionSelected = BreadcrumbStore.getSelectedInsertions();
            renderModule    = <InsertionManager insertionSelected={insertionSelected} addAction={this.showForm} viewManager={this.showViewManager} />;
            renderForm      = <InsertionForm    insertionSelected={insertionSelected}  closeAction={this.hideForm} />;
        } else {
            renderModule = '';
        }

        if(!this.state.showForm &&  !this.state.showViewManager ){
            renderForm = '';
        } else if(this.state.showViewManager){
            renderForm = <ViewManagerModal closeAction={this.hideViewManager} />
        }

        let nav_project_class = (activeModule === 'projectmanager') ?
          "nav-item o-nav__item  c-prim-nav_item mg-t--15 nav-item__active" :
          "nav-item o-nav__item  c-prim-nav_item mg-t--15";
        let project_link = (/^r/.test(this.context.access.campaign_access))
            ? (
                <Link className={nav_project_class} aria-label="project" title="Projects" to={projectManagerLink}>
                    {t('common:Projects')}
                    <svg className="c-icon c-icon--nav-primary icon-project">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-project"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let nav_campaign_class = (activeModule === 'campaignmanager')
            ? "nav-item o-nav__item  c-prim-nav_item nav-item__active"
            : "nav-item o-nav__item  c-prim-nav_item";
        let campaign_link = (/^r/.test(this.context.access.campaign_access))
            ? <Link className={nav_campaign_class} aria-label="campaign" title="Campaigns" to={campaignManagerLink}>
                    {t('common:Campaigns')}
                    <svg className="c-icon c-icon--nav-primary icon-campaign">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-campaign"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            : '';
        let dashboard_link = (/^r/.test(this.context.access.campaign_access))
            ? (
                <Link className="nav-item o-nav__item  c-prim-nav_item mg-t--15 mg-b--15" aria-label="dashboard" title="Dashboard" to={dashboardManagerLink}>
                    {t('common:Dashboard')}
                    <svg className="c-icon c-icon--nav-primary icon-dashboard">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-dashboard"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let conversion_link = (/^r/.test(this.context.access.conversion_access))
            ? (
                <Link className="nav-item o-nav__item  c-prim-nav_item mg-b--15 mg-t--15" aria-label="conversion" title="Conversions" to={conversionManagerLink}>
                    {t('common:Conversions')}
                    <svg className="c-icon c-icon--nav-primary icon-conversion">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-conversion"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let nav_site_offer_class = (activeModule === 'siteoffermanager') ?
          "nav-item o-nav__item  c-prim-nav_item nav-item__active" :
          "nav-item o-nav__item  c-prim-nav_item";
        let site_offer_link = (/^r/.test(this.context.access.campaign_access))
            ? (
                <Link className={nav_site_offer_class} title="Site Offers" to={siteofferManagerLink}>
                    {t('common:Site Offers')}
                    <svg className="c-icon c-icon--nav-primary icon-site_offer">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-site_offer"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let nav_insertion_class = (activeModule === 'insertionmanager') ?
          "nav-item o-nav__item c-prim-nav_item nav-item__active" :
          "nav-item o-nav__item c-prim-nav_item";
        let insertion_link = (/^r/.test(this.context.access.campaign_access))
            ? (
                <Link className={nav_insertion_class} aria-label="insertion" title="Insertions" to={insertionManagerLink}>
                    {t('common:Insertions')}
                    <svg className="c-icon c-icon--nav-primary icon-insertion">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-insertion"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let creative_link = (/^r/.test(this.context.access.creative_access))
            ? (
                <Link className="nav-item o-nav__item c-prim-nav_item mg-b--15" aria-label="creative" title="Creatives" to={creativeManagerLink}>
                    {t('common:Creatives')}
                    <svg className="c-icon c-icon--nav-primary icon-creative">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-creative"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let report_link = (/^r/.test(this.context.access.reporting_access))
            ? (
                <Link className="nav-item o-nav__item  c-prim-nav_item mg-t--15" aria-label="report" title="Reports" to={reportManagerLink}>
                    {t('common:Reports')}
                    <svg className="c-icon c-icon--nav-primary icon-report">
                        <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-report"} />
                    </svg>
                    <svg className="svg-bg-btn">
                        <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                    </svg>
                </Link>
            )
            : '';
        let logs_link =
            <Link className="nav-item o-nav__item  c-prim-nav_item" aria-label="logs" title="Logs" to={reportManagerLink}>
                {t('common:Logs')}
                <svg className="c-icon c-icon--nav-primary icon-logs">
                    <use className="svg-icon" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-logs"} />
                </svg>
                <svg className="svg-bg-btn">
                    <use className="use-bg" xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#btn_bg_full"} />
                </svg>
            </Link>;

        let menuInfosProfile = '';

        if (this.state.showMenu) {
            menuInfosProfile = <InfosProfile accountId={account_id} />;
        }
        let iconLocation = ''
        if (activeModule != 'projectmanager') {
            iconLocation = (<svg className="icon-location">
                <use xlinkHref={"/img/svg-sprite/wcm-sprite.svg?v="+app_version+"#icon-location"} />
            </svg>);
        }


        return (
            <div>
                <div>
                    <div>

                        <header className="page-header">


                        </header>
                        {renderModule}
                    </div>
                </div>
            </div>
        );
    }
}

ModuleManager.contextTypes = {
    router  : React.PropTypes.object.isRequired,
    history : React.PropTypes.object,
    location: React.PropTypes.object,
    params  : React.PropTypes.object,
    access  : React.PropTypes.object
};

export default translate([
    'common', 'breadcrumb'
], {wait: true})(ModuleManager);
