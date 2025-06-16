async function runAudit() {
    const log = document.getElementById('logPath').value;
    const out = document.getElementById('outDir').value;
    const res = await eel.run_selinux_audit(log, out)();
    document.getElementById('auditOutput').textContent = JSON.stringify(res, null, 2);
}
