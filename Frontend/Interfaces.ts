interface sidebarRTK { 
    currentPage: string,
    currentList: string,
};

interface sidebarMenuItems {
    name: string,
    path: string,
    iconS: string,
    iconNS: string,
    patient: Boolean,
}

export type {
    sidebarRTK,
    sidebarMenuItems
}