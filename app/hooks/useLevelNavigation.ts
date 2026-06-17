import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { updateProgress } from "../lib/progress";

interface UseLevelNavigationProps {
    numericLevelId: number;
    currentLevelContent: any[];
    isVocabLevel: boolean;
    userId: string;
    initialStep?: number;
    initialSubstep?: number;
    token?: string; // 🔥 Agrega esta línea
}

export const useLevelNavigation = ({
    numericLevelId,
    currentLevelContent,
    isVocabLevel,
    userId,
    initialStep = 0,
    initialSubstep = 0,
    token // 🔥 Recíbelo aquí
}: UseLevelNavigationProps) => {

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const isProPath = pathname.includes("/pro/");
    const baseRoute = isProPath ? "/dashboard/level/pro" : "/dashboard/level";

    const [step, setStep] = useState(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const urlStep = params.get('step');
            return urlStep !== null ? parseInt(urlStep) : initialStep;
        }
        return initialStep;
    });

    const [subStep, setSubStep] = useState(() => {
        if (typeof window !== "undefined") {
            const params = new URLSearchParams(window.location.search);
            const urlSubstep = params.get('substep');
            return urlSubstep !== null ? parseInt(urlSubstep) : initialSubstep;
        }
        return initialSubstep;
    });

    const [showPractice, setShowPractice] = useState(false);
    const [practiceText, setPracticeText] = useState("");

    useEffect(() => {
        const urlStep = parseInt(searchParams.get('step') || initialStep.toString());
        const urlSubstep = parseInt(searchParams.get('substep') || initialSubstep.toString());

        setStep(urlStep);
        setSubStep(urlSubstep);
        setShowPractice(false);
        setPracticeText("");
    }, [numericLevelId, searchParams, initialStep, initialSubstep]);

    const goNext = async (isPracticeTime: boolean) => {
        // 🔍 LOG 2: Entrada a goNext
        //console.log("➡️ [HOOK goNext] Disparado. Estado actual ->", { step, subStep, isPracticeTime, tokenState: token ? "Presente" : "Vacío" });

        if (!currentLevelContent || currentLevelContent.length === 0) {
            console.warn("⚠️ [HOOK goNext] Abortado: currentLevelContent está vacío.");
            return;
        }

        const currentPartItems = currentLevelContent[step]?.content || [];

        let nextLevel = numericLevelId;
        let nextStep = step;
        let nextSubStep = subStep;

        if (isPracticeTime) {
            setShowPractice(false);
            setPracticeText("");
        }

        if (isVocabLevel && isPracticeTime && !showPractice) {
            setShowPractice(true);
            return;
        }

        if (subStep < currentPartItems.length - 1) {
            nextSubStep = subStep + 1;

            setStep(nextStep);
            setSubStep(nextSubStep);

            // 🔍 LOG 3: Antes de actualizar progreso en cambio de substep
            //console.log("🚀 [HOOK goNext] Ejecutando updateProgress (Mismo nivel, siguiente substep) ->", { userId, nextLevel, nextStep, nextSubStep, tokenEnviado: token ? "SI" : "NO" });
            updateProgress(userId, nextLevel, nextStep, nextSubStep, token);

            const params = new URLSearchParams(window.location.search);
            params.set('step', nextStep.toString());
            params.set('substep', nextSubStep.toString());
            router.replace(`${pathname}?${params.toString()}`);
        } else if (/*step < currentLevelContent.length - 1*/ false) {
            // Código comentado...
        } else {
            nextLevel = numericLevelId + 1;

            // 🔍 LOG 4: Antes de actualizar progreso en cambio de nivel completo
            //console.log("🎉 [HOOK goNext] Ejecutando updateProgress (Siguiente Nivel) ->", { userId, nextLevel, step: 0, substep: 0, tokenEnviado: token ? "SI" : "NO" });
            await updateProgress(userId, nextLevel, 0, 0, token);
            router.push(`${baseRoute}/${nextLevel}`);
            return;
        }
    };

    const goBack = (isPracticeTime: boolean) => {
        // 🔍 LOG 5: Entrada a goBack
        //console.log("⬅️ [HOOK goBack] Disparado. Estado actual ->", { step, subStep, isPracticeTime, tokenState: token ? "Presente" : "Vacío" });

        let nextLevel = numericLevelId;
        let nextStep = step;
        let nextSubStep = subStep;

        setShowPractice(false);
        setPracticeText("");

        if (subStep > 0) {
            nextSubStep = subStep - 1;
            setSubStep(nextSubStep);

            // 🔍 LOG 6: updateProgress en goBack substep
            //console.log("🚀 [HOOK goBack] Ejecutando updateProgress (Substep anterior) ->", { userId, nextLevel, nextStep, nextSubStep, tokenEnviado: token ? "SI" : "NO" });
            updateProgress(userId, nextLevel, nextStep, nextSubStep, token);

            const params = new URLSearchParams(window.location.search);
            params.set('substep', nextSubStep.toString());
            router.replace(`${pathname}?${params.toString()}`);
        } else if (step > 0) {
            nextStep = step - 1;
            const prevPartItems = currentLevelContent[nextStep]?.content || [];
            nextSubStep = prevPartItems.length > 0 ? prevPartItems.length - 1 : 0;

            setStep(nextStep);
            setSubStep(nextSubStep);

            // 🔍 LOG 7: updateProgress en goBack step anterior
            //console.log("🚀 [HOOK goBack] Ejecutando updateProgress (Step anterior) ->", { userId, nextLevel, nextStep, nextSubStep, tokenEnviado: token ? "SI" : "NO" });
            updateProgress(userId, nextLevel, nextStep, nextSubStep, token);

            const params = new URLSearchParams(window.location.search);
            params.set('step', nextStep.toString());
            params.set('substep', nextSubStep.toString());
            router.replace(`${pathname}?${params.toString()}`);
        } else if (numericLevelId > 1) {
            nextLevel = numericLevelId - 1;

            // 🔍 LOG 8: updateProgress en goBack nivel anterior
            //console.log("🚀 [HOOK goBack] Ejecutando updateProgress (Nivel anterior) ->", { userId, nextLevel, step: 0, substep: 0, tokenEnviado: token ? "SI" : "NO" });
            updateProgress(userId, nextLevel, 0, 0, token);
            router.push(`${baseRoute}/${nextLevel}`);
            return;
        }
    };

    return {
        step,
        subStep,
        showPractice,
        setShowPractice,
        practiceText,
        setPracticeText,
        goNext,
        goBack,
        setStep,
        setSubStep
    };
};