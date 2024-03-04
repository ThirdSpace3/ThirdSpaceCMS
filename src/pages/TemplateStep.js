import TemplateStep1 from "../components/website/TemplateSteps/TemplateStep1"
import TemplateStep2 from "../components/website/TemplateSteps/TemplateStep2"
import TemplateStep3 from "../components/website/TemplateSteps/TemplateStep3"
import TemplateStep4 from "../components/website/TemplateSteps/TemplateStep4"
import TemplateStepsMobile from "../components/website/TemplateSteps/TemplateStepsMobile"
import TemplateStepsBTN from "../components/website/TemplateSteps/TemplateStepsBTN"
import ReportBugBTN from "../components/website/ReportBugBTN"

export default function TemplateStep() {
    return (
        <>
           <TemplateStep1 />
           <TemplateStep2 />
           <TemplateStep3 />
           <TemplateStep4 />
           <TemplateStepsMobile />
           <TemplateStepsBTN />
           <ReportBugBTN />

           <img src="./images/template-deco-1.png" alt="" class="template-deco-bot"/>
            <img src="./imags/template-deco-2.png" alt="" class="template-deco-top"/>


        </>
    );
}